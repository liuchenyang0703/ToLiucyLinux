import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const OUTPUT = resolve("src/.vuepress/public/data/cnnvd-hot.json");
const BASE_URL = "https://www.cnnvd.org.cn/cnnvdweb";
const API_PATH = "/cnnvdweb/homePage/hotVulNewList";
const APP_ID = "6i8417579268034679HXvp0Kb6r1C2A9";
const SOURCE_URL = "https://www.cnnvd.org.cn/frontend/hotVul";
const severityMap = { "超危": "CRITICAL", "严重": "CRITICAL", "Critical": "CRITICAL", "高危": "HIGH", "High": "HIGH", "中危": "MEDIUM", "Medium": "MEDIUM", "低危": "LOW", "Low": "LOW" };
const severityLabelMap = { Critical: "超危", High: "高危", Medium: "中危", Low: "低危" };
const knownCveIds = new Map([
  ["CNNVD-2026-95992718", "CVE-2026-65905"],
]);
const DETAIL_PATH = "/cnnvdweb/homePage/searchVulByCnnvdCode";

const randomNonce = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length: 32 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
};

const createSignedHeaders = async (apiPath) => {
  const timestamp = Date.now().toString();
  const nonce = randomNonce();
  const headers = {
    "Content-Type": "application/json;charset=UTF-8", "X-Appid": APP_ID, "X-Timestamp": timestamp, "X-Nonce": nonce,
    "Origin": "https://www.cnnvd.org.cn", "Referer": SOURCE_URL, "User-Agent": "ToLiucyLinux vulnerability page builder",
  };
  const signResponse = await fetch(`${BASE_URL}/tourist/sign`, {
    method: "POST", headers, body: JSON.stringify({ signStr: `POST${apiPath}${timestamp}${nonce}` }),
  });
  const signResult = await signResponse.json();
  if (!signResponse.ok || signResult.code !== 200 || !signResult.data) throw new Error(signResult.message || `CNNVD 签名请求失败：${signResponse.status}`);
  return { ...headers, "X-Sign": signResult.data };
};

const wait = (milliseconds) => new Promise((resolvePromise) => setTimeout(resolvePromise, milliseconds));

const fetchDetail = async (item, retries = 3) => {
  let lastError;
  for (let attempt = 1; attempt <= retries; attempt += 1) {
    try {
      const headers = await createSignedHeaders(DETAIL_PATH);
      const response = await fetch(`${BASE_URL}/homePage/searchVulByCnnvdCode`, {
        method: "POST", headers, body: JSON.stringify({ cnnvdCode: item.cnnvdCode }),
      });
      const detail = await response.json();
      if (response.ok && detail.code === 200 && detail.data) return detail.data;
      throw new Error(detail.message || `CNNVD 详情请求失败：${response.status}`);
    } catch (error) {
      lastError = error;
      if (attempt < retries) await wait(attempt * 500);
    }
  }
  throw lastError;
};

const fetchDetailsInBatches = async (items, batchSize = 2) => {
  const details = [];
  for (let index = 0; index < items.length; index += batchSize) {
    const batch = items.slice(index, index + batchSize);
    const results = await Promise.allSettled(batch.map(fetchDetail));
    details.push(...results.map((result) => result.status === "fulfilled" ? result.value : null));
    if (index + batchSize < items.length) await wait(250);
  }
  return details;
};

const readExistingCveIds = async () => {
  try {
    const existing = JSON.parse(await readFile(OUTPUT, "utf8"));
    return new Map((existing.items ?? []).map((item) => [String(item.id), item.cveId || ""]));
  } catch {
    return new Map();
  }
};

const fetchHotVulnerabilities = async () => {
  const existingCveIds = await readExistingCveIds();
  const headers = await createSignedHeaders(API_PATH);
  const dataResponse = await fetch(`${BASE_URL}/homePage/hotVulNewList`, {
    method: "POST", headers, body: JSON.stringify({ page: 1, pageSize: 100 }),
  });
  const result = await dataResponse.json();
  if (!dataResponse.ok || result.code !== 200 || !Array.isArray(result.data)) throw new Error(result.message || `CNNVD 数据请求失败：${dataResponse.status}`);

  const details = await fetchDetailsInBatches(result.data);

  return {
    fetchedAt: new Date().toISOString(), source: "CNNVD 热点漏洞", sourceUrl: SOURCE_URL,
    items: result.data.map((item, index) => {
      const detail = details[index];
      return {
        id: String(item.vulId ?? ""), name: item.vulName || "未命名漏洞",
        cveId: detail?.cveId || knownCveIds.get(item.cnnvdCode) || existingCveIds.get(String(item.vulId ?? "")) || "",
        severity: severityMap[item.hazardLevel] || "UNKNOWN", severityLabel: severityLabelMap[item.hazardLevel] || item.hazardLevel || "未知",
        published: item.publishTime || "未知", hasAi: Number(item.hasAi) === 1,
        url: `https://www.cnnvd.org.cn/frontend/detail?vulId=${encodeURIComponent(item.vulId ?? "")}`,
      };
    }),
  };
};

try {
  const data = await fetchHotVulnerabilities();
  await mkdir(dirname(OUTPUT), { recursive: true });
  await writeFile(OUTPUT, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  console.log(`CNNVD 热点漏洞已更新：${data.items.length} 条`);
} catch (error) {
  try {
    await readFile(OUTPUT, "utf8");
    console.warn(`CNNVD 更新失败，继续使用现有数据：${error.message}`);
  } catch {
    throw error;
  }
}
