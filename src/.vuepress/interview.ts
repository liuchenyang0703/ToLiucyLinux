import {arraySidebar} from "vuepress-theme-hope";

export const interview = arraySidebar([
    {
        text: "Linux基础常见面试题",
        icon: "linux",
        prefix: "intervie_linux/",
        // 添加下拉框
        collapsible: true,
        children: "structure",
        // children: [
        //     "clarify-whether-java-value-passing-or-reference-passing",
        // ],
    },
    {
        text: "Docker常见面试题",
        icon: "docker",
        prefix: "intervie_Docker/",
        // 添加下拉框
        collapsible: true,
        children: "structure",
    },
    {
        text: "Kubernetes常见面试题",
        icon: "k8s1",
        prefix: "intervie_Kubernetes/",
        // 添加下拉框
        collapsible: true,
        children: "structure",
    },
    {
        text: "Nginx常见面试题",
        icon: "nginx",
        prefix: "intervie_Nginx/",
        // 添加下拉框
        collapsible: true,
        children: "structure",
    },
    {
        text: "Zabbix常见面试题",
        icon: "zabbix",
        prefix: "intervie_Zabbix/",
        // 添加下拉框
        collapsible: true,
        children: "structure",
    },
    {
        text: "数据库常见面试题",
        icon: "database-2-line",
        prefix: "intervie_database/",
        // 添加下拉框
        collapsible: true,
        children: "structure",
    },
    {
        text: "Jenkins常见面试题",
        icon: "jenkins",
        prefix: "intervie_Jenkins/",
        // 添加下拉框
        collapsible: true,
        children: "structure",
    },
    {
        text: "Ansblie常见面试题",
        icon: "ansible",
        prefix: "intervie_Ansible/",
        // 添加下拉框
        collapsible: true,
        children: "structure",
    },
    {
        text: "Git常见面试题",
        icon: "git",
        prefix: "intervie_git/",
        // 添加下拉框
        collapsible: true,
        children: "structure",
    },
    {
        text: "网络常见面试题",
        icon: "wangluo",
        prefix: "intervie_network/",
        // 添加下拉框
        collapsible: true,
        children: "structure",
    },
    // {
    //     text: "死磕面试",
    //     icon: "book",
    //     prefix: "knowledge-block/",
    //     collapsible: true,
    //     // children: "structure",
    //     children: [
    //         {
    //             text: "重要知识点",
    //             icon: "star",
    //             prefix: "star/",
    //             children: [
    //                 "clarify-whether-java-value-passing-or-reference-passing",
    //             ],
    //         },
    //     ],
    // },
]);