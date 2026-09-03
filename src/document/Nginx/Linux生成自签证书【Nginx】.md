---
title: Linux生成自签证书【Nginx】
icon: circle-info
order: 1
category:
  - Linux
  - Nginx
tag:
  - Linux
  - Nginx
  - ssl
  - 自签证书
  - 运维
date: 2025-02-05
isOriginal: true
pageview: true
article: true
breadcrumb: false
comment: true
---

>👨‍🎓**博主简介**
>
>&emsp;&emsp;🏅[CSDN博客专家](https://blog.csdn.net/liu_chen_yang?type=blog)
>&emsp;&emsp;🏅[云计算领域优质创作者](https://blog.csdn.net/liu_chen_yang?type=blog)
>&emsp;&emsp;🏅[华为云开发者社区专家博主](https://bbs.huaweicloud.com/community/usersnew/id_1661843828089234)
>&emsp;&emsp;🏅[阿里云开发者社区专家博主](https://developer.aliyun.com/profile/7yu26jk3lfqxg)
>💊**交流社区：**[运维交流社区](https://bbs.csdn.net/forums/lcy) 欢迎大家的加入！
>🐋 希望大家多多支持，我们一起进步！😄
>🎉如果文章对你有帮助的话，欢迎 点赞 👍🏻 评论 💬 收藏 ⭐️ 加关注+💗

---


## 1. 安装 OpenSSL

首先检查是否安装了Openssl，在服务器执行：

```bash
openssl version
```

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202502051004411.png)



如果没有就是系统未安装 OpenSSL，可以通过以下命令安装：

- **Debian/Ubuntu操作系统**:
  
```bash
sudo apt-get install openssl -y 
```


- **CentOS/RHEL操作系统**:

```bash
sudo yum install openssl -y 
```


## 2. 生成私钥
使用以下命令生成一个 2048 位的 RSA 私钥：

> 私钥名称可自己定义，一般是以域名为命名。`private.key`

```bash
openssl genpkey -algorithm RSA -out private.key -aes256
```
系统会提示设置私钥的密码。

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202502051028792.png)

## 3. 生成证书签名请求 (CSR)
使用以下命令生成 CSR：

> 同样，如果私钥名称已修改，这里也需要修改一下，csr名称也可以修改，一般也是以域名为命名。`private.key`，`csr.csr`

```bash
openssl req -new -key private.key -out csr.csr
```
系统会提示需要输入私钥的密码，还有提示输入国家、省份、城市、组织等信息。

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202502051036579.png)

## 4. 生成自签证书
使用以下命令生成自签证书：

> 同样，如果私钥名称、证书签名名称已修改，这里也需要修改一下，crt名称也可以修改，一般也是以域名为命名。`private.key`，`csr.csr`，`certificate.crt`

```bash
openssl x509 -req -days 365 -in csr.csr -signkey private.key -out certificate.crt
```
`-days 365` 表示证书有效期为 365 天。

会提示输入一下私钥密码；

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202502051042446.png)

## 5. 验证证书

使用以下命令验证证书内容：
```bash
openssl x509 -in certificate.crt -text -noout
```

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202502051047839.png)



出现这些代表自签证书已经配置成功，生成完共有三个文件【crt：自签证书、csr：证书签名信息、key：私钥】。

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202502051050337.png)



## 6. 移除私钥密码（可选）

如果不想每次使用私钥都输入密码，可以移除密码：

```bash
openssl rsa -in private.key -out private.key
```

## 7. 使用证书
生成的 `certificate.crt` 和 `private.key` 可用于配置 HTTPS 服务器等场景，一般用于Nginx。

Nginx配置ssl证书如下：

```bash
    server {
        listen       443 ssl;
        server_name  域名;

        ssl_certificate      /usr/local/nginx/conf/ssl/certificate.crt; # 或者是pem文件
        ssl_certificate_key  /usr/local/nginx/conf/ssl/private.key;

        ssl_session_cache    shared:SSL:1m;
        ssl_session_timeout  5m;

        ssl_ciphers  HIGH:!aNULL:!MD5;
        ssl_prefer_server_ciphers  on;

        location / {
            root   html;
            index  index.html index.htm;
        }
    }
```

## 8. 页面访问展示

页面访问会提示不安全的，可以点击`高级`、`继续访问`

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202502051055220.png)

可以查看证书详情：

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202502051056796.png)



![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202502051057211.png)

## 9. 总结
通过以上步骤，可以在 Linux 系统上生成自签证书。

自签证书仅适用于测试和内部环境，在生产环境中建议使用受信任的证书颁发机构（CA）签发的证书。

<font color=blue>自签证书名称也可以在执行完所有的命令之后，`mv` 重命名证书名称。</font>



* [x] **命令解析：**

* 生成私钥命令

```bash
openssl genpkey -algorithm RSA -out private.key -aes256
```

> 1. **`openssl`**
>
> OpenSSL 是一个开源的工具包，用于实现 SSL/TLS 协议以及加密算法。它广泛用于生成密钥、证书、加密数据等操作。
>
> 2. **`genpkey`**
>
> 这是 OpenSSL 的一个子命令，用于生成私钥（Private Key）。`genpkey` 是一个通用的私钥生成命令，支持多种加密算法（如 RSA、ECDSA 等）。
>
> 3. **`-algorithm RSA`**
>
> 指定生成的密钥类型为 RSA（Rivest-Shamir-Adleman）。RSA 是一种非对称加密算法，广泛用于加密通信和数字签名。它基于大整数分解的数学难题，具有较高的安全性。
>
> 4. **`-out private.key`**
>
> 指定生成的私钥文件保存路径和文件名。这里将私钥保存为 `private.key` 文件。私钥文件是极其重要的，它用于解密数据或生成数字签名，必须妥善保管，避免泄露。
>
> 5. **`-aes256`**
>
> 这个选项表示对生成的私钥文件进行加密保护，加密算法使用 AES-256。AES-256 是一种对称加密算法，具有较高的安全性。通过加密私钥文件，可以防止私钥被未经授权的人员直接读取。
>
> - 当运行这条命令时，OpenSSL 会提示用户输入一个密码（passphrase）。这个密码将用于加密私钥文件。只有输入正确的密码，才能解密并使用私钥。



* 生成证书签名请求命令

```bash
openssl req -new -key private.key -out csr.csr
```

> 1. **`openssl req`**
>
> `openssl req` 是 OpenSSL 的一个子命令，用于生成和处理证书签名请求（CSR）。CSR 是一个文件，其中包含公钥、身份信息（如域名、组织信息等）以及签名信息，用于向证书颁发机构（CA）申请数字证书。
>
> 2. **`-new`**
>
> 这个选项表示生成一个新的 CSR。它会启动一个交互式流程，提示用户输入证书相关的身份信息。
>
> 3. **`-key private.key`**
>
> 指定用于生成 CSR 的私钥文件路径。私钥文件 `private.key` 中包含公钥部分，CSR 中的公钥就是从这个私钥文件中提取的。私钥用于对 CSR 中的内容进行签名，确保 CSR 的完整性和真实性。
>
> 4. **`-out csr.csr`**
>
> 指定生成的 CSR 文件的保存路径和文件名。CSR 文件将包含公钥和身份信息，并且通过私钥签名。生成的 `csr.csr` 文件可以提交给证书颁发机构（CA）进行签名，生成最终的数字证书。
>
> **执行过程**
>
> 当运行这条命令时，OpenSSL 会提示用户输入证书相关的身份信息，包括以下内容：
>
> 1. **Country Name (C)**：国家代码，如 CN（中国）、US（美国）。
> 2. **State or Province Name (ST)**：省份或州。
> 3. **Locality Name (L)**：城市或地区。
> 4. **Organization Name (O)**：组织名称。
> 5. **Organizational Unit Name (OU)**：组织单位名称（如部门名称）。
> 6. **Common Name (CN)**：通用名称，通常是域名（如 `www.example.com`），对于服务器证书，CN 应该是服务器的域名。
> 7. **Email Address**：联系邮箱地址。
> 8. **Challenge Password**：挑战密码（可选，用于某些特定用途）。
> 9. **Optional Company Name**：可选的公司名称。
>
> 这些信息将被包含在 CSR 中，并通过私钥进行签名。生成的 CSR 文件是一个文本文件，通常以 `-----BEGIN CERTIFICATE REQUEST-----` 和 `-----END CERTIFICATE REQUEST-----` 作为开头和结尾。



* 生成自签证书命令

```bash
openssl x509 -req -days 365 -in csr.csr -signkey private.key -out certificate.crt
```

> 1. **`openssl x509`**
>
> `openssl x509` 是 OpenSSL 的一个子命令，用于处理 X.509 证书。它可以用于查看证书内容、验证证书、生成自签名证书等操作。
>
> 2. **`-req`**
>
> 这个选项表示处理一个证书签名请求（CSR）。它告诉 OpenSSL，输入文件是一个 CSR，而不是其他类型的文件（如证书或私钥）。
>
> 3. **`-days 365`**
>
> 指定生成的证书的有效期为 365 天。数字证书都有一个有效期，超过有效期后，证书将不再被信任。你可以根据需要调整这个值，例如 `-days 730` 表示有效期为两年。
>
> 4. **`-in csr.csr`**
>
> 指定输入的 CSR 文件路径。这个 CSR 文件通常是由前面的 `openssl req` 命令生成的，包含了公钥和身份信息。
>
> 5. **`-signkey private.key`**
>
> 指定用于签名的私钥文件路径。这个私钥文件必须与生成 CSR 时使用的私钥相同。自签名证书的签名过程是使用私钥对证书内容进行签名，以证明证书的完整性和真实性。
>
> 6. **`-out certificate.crt`**
>
> 指定生成的证书文件的保存路径和文件名。生成的证书文件 `certificate.crt` 是一个 X.509 格式的证书，可以用于 SSL/TLS 服务器或其他需要证书的场景。



* 验证证书命令

```bash
openssl x509 -in certificate.crt -text -noout
```

> 这条命令是使用 OpenSSL 工具查看一个 X.509 数字证书的详细内容，而不输出证书本身。以下是命令的详细解析：
>
> 1. **`openssl x509`**
>
> `openssl x509` 是 OpenSSL 的一个子命令，用于处理 X.509 证书。它可以用于查看证书内容、验证证书、生成自签名证书等操作。
>
> 2. **`-in certificate.crt`**
>
> 指定输入的证书文件路径。这里指定要查看的证书文件为 `certificate.crt`。
>
> 3. **`-text`**
>
> 这个选项表示以文本形式输出证书的详细内容。它会显示证书中的所有字段和相关信息，包括：
>
> - **证书版本（Version）**
> - **序列号（Serial Number）**
> - **签名算法（Signature Algorithm）**
> - **颁发者（Issuer）**
> - **有效期（Validity）**
>   - **Not Before（生效时间）**
>   - **Not After（过期时间）**
> - **主题（Subject）**
> - **公钥信息（Subject Public Key Info）**
> - **扩展信息（Extensions）**（如果有）
>
> 4. **`-noout`**
>
> 这个选项表示不输出证书本身的内容（即不输出证书的 PEM 格式内容）。通常，如果不使用 `-noout`，命令会输出证书的 PEM 内容（以 `-----BEGIN CERTIFICATE-----` 和 `-----END CERTIFICATE-----` 为开头和结尾）。使用 `-noout` 可以避免输出这些内容，只显示证书的详细信息。



* 移除私钥密码命令

```bash
openssl rsa -in private.key -out private.key
```

> 1. **`openssl rsa`**
>
> `openssl rsa` 是 OpenSSL 的一个子命令，专门用于处理 RSA 私钥。它可以用于查看私钥信息、转换私钥格式、解密加密的私钥等操作。
>
> 2. **`-in private.key`**
>
> 指定输入的私钥文件路径。这里表示从文件 `private.key` 中读取 RSA 私钥。
>
> 3. **`-out private.key`**
>
> 指定输出的私钥文件路径。这里表示将处理后的私钥重新写入到文件 `private.key` 中。



