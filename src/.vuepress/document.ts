import {arraySidebar} from "vuepress-theme-hope";

export const document = arraySidebar([
    {
      text: "Linux",
      icon: "linux",
      prefix: "Linux/",
      // 添加下拉框
      collapsible: true,
      children: "structure",
    },
    {
      text: "Docker",
      icon: "docker",
      prefix: "Docker/",
      // 添加下拉框
      collapsible: true,
      children: "structure",
    },
    {
      text: "Kubernetes",
      icon: "k8s1",
      prefix: "Kubernetes/",
      // 添加下拉框
      collapsible: true,
      children: "structure",
    },
    {
      text: "Nginx",
      icon: "nginx",
      prefix: "Nginx/",
      // 添加下拉框
      collapsible: true,
      children: "structure",
    },
    {
      text: "Linux监控服务",
      icon: "jiankong",
      prefix: "monitor/",
      // 添加下拉框
      collapsible: true,
      children: [
         {
           text: "Zabbix",
           icon: "zabbix",
           prefix: "zabbix/",
           // 添加下拉框
           collapsible: true,
           children: "structure",
         },
         {
           text: "Prometheus",
           icon: "prometheus",
           prefix: "Prometheus/",
           // 添加下拉框
           collapsible: true,
           children: "structure",
         },
        ],
    },
    {
      text: "数据库",
      icon: "database-2-line",
      prefix: "database/",
      // 添加下拉框
      collapsible: true,
      children: "structure",
    },
    {
      text: "自动化运维",
      icon: "zidonghua",
      prefix: "automation/",
      // 添加下拉框
      collapsible: true,
      children: [
        {
          text: "Ansblie",
          icon: "ansible",
          prefix: "ansible/",
          // 添加下拉框
          collapsible: true,
          children: "structure",
        },
        {
          text: "Jenkins",
          icon: "jenkins",
          prefix: "jenkins/",
          // 添加下拉框
          collapsible: true,
          children: "structure",
        },
      ],
    },
    {
      text: "Git",
      icon: "git",
      prefix: "Git/",
      // 添加下拉框
      collapsible: true,
      children: "structure",
    },
    {
      text: "Linux虚拟化",
      icon: "33xunihuapingtaiguanli",
      prefix: "virtualization/",
      // 添加下拉框
      collapsible: true,
      children: "structure",
    },
    {
      text: "Linux服务器安全",
      icon: "fuwuqianquan",
      prefix: "secure/",
      // 添加下拉框
      collapsible: true,
      children: [
        {
          text: "OpenSSH",
          icon: "a-061_shuben",
          prefix: "openssh/",
          // 添加下拉框
          collapsible: true,
          children: "structure",
        },
      ],
    },
    {
      text: "网络",
      icon: "wangluo",
      prefix: "network/",
      // 添加下拉框
      collapsible: true,
      children: "structure",
    },
    {
      text: "Windows",
      icon: "windows",
      prefix: "Windows/",
      // 添加下拉框
      collapsible: true,
      children: "structure",
    },
    {
      text: "Java",
      icon: "java",
      prefix: "Java/",
      // 添加下拉框
      collapsible: true,
      children: "structure",
    },
    {
      text: "Python",
      icon: "python",
      prefix: "Python/",
      // 添加下拉框
      collapsible: true,
      children: "structure",
    },
    {
      text: "Go",
      icon: "go",
      prefix: "Go/",
      // 添加下拉框
      collapsible: true,
      children: "structure",
    },
    {
      text: "前端技术",
      icon: "WEBqianduan",
      collapsible: true,
      prefix: "front/",
      children: "structure",
    },
    {
      text: "其他技术",
      icon: "qita1",
      collapsible: true,
      prefix: "other/",
      children: "structure",
    },
    // {
    //   text: "Linux文章临时目录",
    //   icon: "a-061_shuben",
    //   collapsible: true,
    //   prefix: "Linux_linshi/",
    //   children: "structure",
    // },
]);