/* ============================================================
 * tools.js —— 工具数据文件
 * ------------------------------------------------------------
 * 这是你以后最常改动的文件：加工具、改介绍、换链接都在这里。
 * 每行数据 = 一个工具卡片，格式如下（照着抄一个改就行）：
 *
 * {
 *   name:  "工具中文名/显示名",
 *   desc:  "一句话说明它能干什么（控制在 30 字内最好）",
 *   cat:   "分类（必须是下面 CATEGORIES 里的某一个，否则筛选会出问题）",
 *   tags:  ["标签1", "标签2"],   // 搜索时也能被搜到
 *   url:   "https://官网地址",
 *   price: "免费" / "免费+付费" / "付费"
 * },
 * ============================================================ */

// 分类列表：想加新分类，在这里加一个字符串即可
const CATEGORIES = [
  "全部",
  "对话助手",
  "图像生成",
  "视频生成",
  "编程开发",
  "写作办公",
  "音频音乐",
  "搜索研究",
  "设计创意",
  "自动化",
];

// 工具数据
const TOOLS = [
  // ---------- 对话助手 ----------
  {
    name: "ChatGPT",
    desc: "OpenAI 出品的通用 AI 助手，能力最全面，插件生态丰富",
    cat: "对话助手",
    tags: ["聊天", "GPT", "写作", "翻译"],
    url: "https://chatgpt.com",
    price: "免费+付费",
  },
  {
    name: "Claude",
    desc: "长文本理解与代码能力强，文风自然，适合深度写作",
    cat: "对话助手",
    tags: ["聊天", "长文", "写作", "Anthropic"],
    url: "https://claude.ai",
    price: "免费+付费",
  },
  {
    name: "Gemini",
    desc: "Google 的多模态助手，与搜索、Gmail、文档深度打通",
    cat: "对话助手",
    tags: ["聊天", "多模态", "Google"],
    url: "https://gemini.google.com",
    price: "免费+付费",
  },
  {
    name: "DeepSeek",
    desc: "国产开源大模型，推理能力突出，API 价格极低",
    cat: "对话助手",
    tags: ["聊天", "推理", "开源", "国产"],
    url: "https://chat.deepseek.com",
    price: "免费",
  },
  {
    name: "Kimi",
    desc: "擅长超长文档阅读与联网搜索，适合论文资料整理",
    cat: "对话助手",
    tags: ["长文", "搜索", "阅读", "国产"],
    url: "https://kimi.moonshot.cn",
    price: "免费",
  },
  {
    name: "豆包",
    desc: "字节跳动出品，中文语境自然，支持图片理解与生成",
    cat: "对话助手",
    tags: ["聊天", "国产", "多模态"],
    url: "https://doubao.com",
    price: "免费",
  },
  {
    name: "通义千问",
    desc: "阿里出品，功能覆盖对话、文档解析与智能体",
    cat: "对话助手",
    tags: ["聊天", "国产", "阿里"],
    url: "https://tongyi.aliyun.com",
    price: "免费",
  },

  // ---------- 图像生成 ----------
  {
    name: "Midjourney",
    desc: "AI 绘画画质标杆，艺术感最强，适合概念设计",
    cat: "图像生成",
    tags: ["绘画", "文生图", "设计"],
    url: "https://www.midjourney.com",
    price: "付费",
  },
  {
    name: "Stable Diffusion",
    desc: "开源绘画引擎，可本地部署，插件与控制能力最强",
    cat: "图像生成",
    tags: ["绘画", "开源", "本地部署"],
    url: "https://stability.ai",
    price: "免费",
  },
  {
    name: "即梦",
    desc: "字节出品的中文 AI 创作工具，出图出视频一体",
    cat: "图像生成",
    tags: ["绘画", "国产", "文生图"],
    url: "https://jimeng.jianying.com",
    price: "免费+付费",
  },
  {
    name: "Ideogram",
    desc: "文字渲染能力出色，做海报、Logo 带字最稳",
    cat: "图像生成",
    tags: ["绘画", "海报", "Logo", "文字"],
    url: "https://ideogram.ai",
    price: "免费+付费",
  },
  {
    name: "Flux",
    desc: "开源高保真图像模型，人物真实感与光影表现优秀",
    cat: "图像生成",
    tags: ["绘画", "开源", "写实"],
    url: "https://blackforestlabs.ai",
    price: "免费+付费",
  },
  {
    name: "Leonardo.ai",
    desc: "游戏与电商素材常用，内置大量风格模型",
    cat: "图像生成",
    tags: ["绘画", "素材", "游戏"],
    url: "https://leonardo.ai",
    price: "免费+付费",
  },

  // ---------- 视频生成 ----------
  {
    name: "Sora",
    desc: "OpenAI 的视频生成模型，画面连贯性与物理感领先",
    cat: "视频生成",
    tags: ["视频", "文生视频", "OpenAI"],
    url: "https://sora.com",
    price: "付费",
  },
  {
    name: "可灵",
    desc: "快手出品，中文提示词友好，生成速度快、画质高",
    cat: "视频生成",
    tags: ["视频", "国产", "文生视频"],
    url: "https://klingai.com",
    price: "免费+付费",
  },
  {
    name: "Runway",
    desc: "老牌 AI 视频工具，编辑功能齐全，影视从业者常用",
    cat: "视频生成",
    tags: ["视频", "剪辑", "特效"],
    url: "https://runwayml.com",
    price: "免费+付费",
  },
  {
    name: "海螺 AI",
    desc: "MiniMax 出品，视频与语音能力兼具，国内可直连",
    cat: "视频生成",
    tags: ["视频", "国产", "语音"],
    url: "https://hailuoai.com",
    price: "免费+付费",
  },

  // ---------- 编程开发 ----------
  {
    name: "GitHub Copilot",
    desc: "VS Code 中最成熟的 AI 补全，写代码的老搭档",
    cat: "编程开发",
    tags: ["代码", "补全", "IDE"],
    url: "https://github.com/features/copilot",
    price: "付费",
  },
  {
    name: "Cursor",
    desc: "AI 原生编辑器，能直接改整个项目，写代码效率高",
    cat: "编程开发",
    tags: ["代码", "编辑器", "IDE"],
    url: "https://cursor.com",
    price: "免费+付费",
  },
  {
    name: "Trae",
    desc: "字节出品的免费 AI 编程工具，中文体验好",
    cat: "编程开发",
    tags: ["代码", "编辑器", "国产"],
    url: "https://www.trae.ai",
    price: "免费",
  },
  {
    name: "v0",
    desc: "一句话生成网页前端界面，适合快速做原型页面",
    cat: "编程开发",
    tags: ["前端", "UI", "原型"],
    url: "https://v0.app",
    price: "免费+付费",
  },
  {
    name: "Bolt.new",
    desc: "浏览器里直接写、跑、部署完整应用，零环境配置",
    cat: "编程开发",
    tags: ["前端", "全栈", "部署"],
    url: "https://bolt.new",
    price: "免费+付费",
  },

  // ---------- 写作办公 ----------
  {
    name: "Notion AI",
    desc: "在笔记里直接改写、总结、翻译，知识管理首选",
    cat: "写作办公",
    tags: ["笔记", "写作", "总结"],
    url: "https://www.notion.so/product/ai",
    price: "付费",
  },
  {
    name: "Grammarly",
    desc: "英文语法与润色神器，写邮件论文必备",
    cat: "写作办公",
    tags: ["英文", "润色", "语法"],
    url: "https://www.grammarly.com",
    price: "免费+付费",
  },
  {
    name: "WPS AI",
    desc: "金山办公内置 AI，写文档、做表格 PPT 直接在 Office 里用",
    cat: "写作办公",
    tags: ["办公", "文档", "PPT", "国产"],
    url: "https://www.wps.cn/ai",
    price: "免费+付费",
  },
  {
    name: "Gamma",
    desc: "输入主题自动生成排版精美的 PPT，省去排版时间",
    cat: "写作办公",
    tags: ["PPT", "演示", "设计"],
    url: "https://gamma.app",
    price: "免费+付费",
  },

  // ---------- 音频音乐 ----------
  {
    name: "Suno",
    desc: "输入歌词与曲风就能生成完整歌曲，含人声演唱",
    cat: "音频音乐",
    tags: ["音乐", "作曲", "人声"],
    url: "https://suno.com",
    price: "免费+付费",
  },
  {
    name: "ElevenLabs",
    desc: "拟真度极高的 AI 配音，支持声音克隆与多语种",
    cat: "音频音乐",
    tags: ["配音", "TTS", "克隆"],
    url: "https://elevenlabs.io",
    price: "免费+付费",
  },
  {
    name: "Udio",
    desc: "音乐生成质量出色，风格控制细腻",
    cat: "音频音乐",
    tags: ["音乐", "作曲"],
    url: "https://udio.com",
    price: "免费+付费",
  },

  // ---------- 搜索研究 ----------
  {
    name: "Perplexity",
    desc: "AI 搜索问答，每条答案都给出处，查资料最省心",
    cat: "搜索研究",
    tags: ["搜索", "问答", "引用"],
    url: "https://www.perplexity.ai",
    price: "免费+付费",
  },
  {
    name: "秘塔 AI 搜索",
    desc: "中文 AI 搜索，无广告、结果结构化，支持全网/学术",
    cat: "搜索研究",
    tags: ["搜索", "国产", "学术"],
    url: "https://metaso.cn",
    price: "免费",
  },
  {
    name: "Elicit",
    desc: "面向科研的文献助手，自动提取论文结论与数据",
    cat: "搜索研究",
    tags: ["论文", "学术", "文献"],
    url: "https://elicit.com",
    price: "免费+付费",
  },
  {
    name: "Consensus",
    desc: "基于真实论文回答科学问题，验证传言的好工具",
    cat: "搜索研究",
    tags: ["论文", "学术", "科普"],
    url: "https://consensus.app",
    price: "免费+付费",
  },

  // ---------- 设计创意 ----------
  {
    name: "Figma AI",
    desc: "主流 UI 设计工具，内置 AI 生成与自动布局",
    cat: "设计创意",
    tags: ["UI", "设计", "协作"],
    url: "https://www.figma.com",
    price: "免费+付费",
  },
  {
    name: "Canva",
    desc: "零基础做图神器，模板海量，海报简历封面一键出",
    cat: "设计创意",
    tags: ["设计", "海报", "模板"],
    url: "https://www.canva.com",
    price: "免费+付费",
  },
  {
    name: "MasterGo",
    desc: "国产在线设计工具，Figma 替代品，中文协作友好",
    cat: "设计创意",
    tags: ["UI", "设计", "国产"],
    url: "https://mastergo.com",
    price: "免费+付费",
  },

  // ---------- 自动化 ----------
  {
    name: "Coze",
    desc: "零代码搭建 AI 机器人，可发布到微信、飞书等平台",
    cat: "自动化",
    tags: ["Bot", "智能体", "国产"],
    url: "https://www.coze.cn",
    price: "免费+付费",
  },
  {
    name: "Dify",
    desc: "开源 LLM 应用开发平台，可私有化部署，做企业知识库",
    cat: "自动化",
    tags: ["智能体", "开源", "知识库"],
    url: "https://dify.ai",
    price: "免费+付费",
  },
  {
    name: "n8n",
    desc: "可视化工作流自动化，连接几百个应用，可自托管",
    cat: "自动化",
    tags: ["工作流", "自动化", "开源"],
    url: "https://n8n.io",
    price: "免费+付费",
  },
  {
    name: "Make",
    desc: "图形化自动化编排，无需代码串联各类 SaaS 服务",
    cat: "自动化",
    tags: ["工作流", "自动化"],
    url: "https://www.make.com",
    price: "免费+付费",
  },
];
