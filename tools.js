/* ============================================================
 * tools.js —— 工具数据（120 款）
 * ------------------------------------------------------------
 * 加工具就在对应分类下抄一条改内容：
 *
 * {
 *   name:  "工具名",
 *   desc:  "一句话说明它能干什么（30 字内最好）",
 *   cat:   "分类（必须是 CATEGORIES 里的某一个）",
 *   tags:  ["标签1", "标签2"],   // 搜索时也能命中
 *   url:   "https://官网地址",
 *   price: "免费" / "免费+付费" / "付费"
 * },
 * ============================================================ */

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
  "模型社区",
  "提示词",
  "学习教程",
];

const TOOLS = [
  // ============ 对话助手 12 ============
  { name: "ChatGPT", desc: "OpenAI 出品的通用 AI 助手，能力最全面，插件生态丰富", cat: "对话助手", tags: ["聊天","GPT","写作","翻译"], url: "https://chatgpt.com", price: "免费+付费" },
  { name: "Claude", desc: "长文本理解与代码能力强，文风自然，适合深度写作", cat: "对话助手", tags: ["聊天","长文","写作","Anthropic"], url: "https://claude.ai", price: "免费+付费" },
  { name: "Gemini", desc: "Google 的多模态助手，与搜索、Gmail、文档深度打通", cat: "对话助手", tags: ["聊天","多模态","Google"], url: "https://gemini.google.com", price: "免费+付费" },
  { name: "DeepSeek", desc: "国产开源大模型，推理能力突出，API 价格极低", cat: "对话助手", tags: ["聊天","推理","开源","国产"], url: "https://chat.deepseek.com", price: "免费" },
  { name: "Kimi", desc: "擅长超长文档阅读与联网搜索，适合论文资料整理", cat: "对话助手", tags: ["长文","搜索","阅读","国产"], url: "https://kimi.moonshot.cn", price: "免费" },
  { name: "豆包", desc: "字节跳动出品，中文语境自然，支持图片理解与生成", cat: "对话助手", tags: ["聊天","国产","多模态"], url: "https://doubao.com", price: "免费" },
  { name: "通义千问", desc: "阿里出品，功能覆盖对话、文档解析与智能体", cat: "对话助手", tags: ["聊天","国产","阿里"], url: "https://tongyi.aliyun.com", price: "免费" },
  { name: "文心一言", desc: "百度出品，中文知识问答稳，支持多模态输入", cat: "对话助手", tags: ["聊天","国产","百度"], url: "https://yiyan.baidu.com", price: "免费" },
  { name: "智谱清言", desc: "清华系 GLM 模型，中文理解扎实，支持长文与代码", cat: "对话助手", tags: ["聊天","国产","GLM","长文"], url: "https://chatglm.cn", price: "免费" },
  { name: "讯飞星火", desc: "科大讯飞出品，语音能力是强项，支持多模态交互", cat: "对话助手", tags: ["聊天","国产","语音","讯飞"], url: "https://xinghuo.xfyun.cn", price: "免费+付费" },
  { name: "Grok", desc: "马斯克 xAI 出品，实时接入 X 平台，风格犀利", cat: "对话助手", tags: ["聊天","实时","xAI"], url: "https://x.ai", price: "付费" },
  { name: "Poe", desc: "一个界面聚合几十个模型，方便横向对比各家能力", cat: "对话助手", tags: ["聊天","聚合","对比"], url: "https://poe.com", price: "免费+付费" },

  // ============ 图像生成 16 ============
  { name: "Midjourney", desc: "AI 绘画画质标杆，艺术感最强，适合概念设计", cat: "图像生成", tags: ["绘画","文生图","设计"], url: "https://www.midjourney.com", price: "付费" },
  { name: "Stable Diffusion", desc: "开源绘画引擎，可本地部署，插件与控制能力最强", cat: "图像生成", tags: ["绘画","开源","本地部署"], url: "https://stability.ai", price: "免费" },
  { name: "即梦", desc: "字节出品的中文 AI 创作工具，出图出视频一体", cat: "图像生成", tags: ["绘画","国产","文生图"], url: "https://jimeng.jianying.com", price: "免费+付费" },
  { name: "Ideogram", desc: "文字渲染能力出色，做海报、Logo 带字最稳", cat: "图像生成", tags: ["绘画","海报","Logo","文字"], url: "https://ideogram.ai", price: "免费+付费" },
  { name: "Flux", desc: "开源高保真图像模型，人物真实感与光影表现优秀", cat: "图像生成", tags: ["绘画","开源","写实"], url: "https://blackforestlabs.ai", price: "免费+付费" },
  { name: "Leonardo.ai", desc: "游戏与电商素材常用，内置大量风格模型", cat: "图像生成", tags: ["绘画","素材","游戏"], url: "https://leonardo.ai", price: "免费+付费" },
  { name: "通义万相", desc: "阿里出品的中文绘画工具，提示词友好出图快", cat: "图像生成", tags: ["绘画","国产","阿里"], url: "https://tongyi.aliyun.com/wanxiang", price: "免费+付费" },
  { name: "文心一格", desc: "百度出品，中文语义理解好，国风插画表现出色", cat: "图像生成", tags: ["绘画","国产","百度","国风"], url: "https://yige.baidu.com", price: "免费+付费" },
  { name: "Recraft", desc: "矢量图生成见长，输出的 SVG 可直接编辑，设计师友好", cat: "图像生成", tags: ["绘画","矢量","SVG","设计"], url: "https://www.recraft.ai", price: "免费+付费" },
  { name: "Adobe Firefly", desc: "Adobe 官方 AI 绘图，商用版权清晰，与 PS 无缝衔接", cat: "图像生成", tags: ["绘画","Adobe","商用","设计"], url: "https://firefly.adobe.com", price: "免费+付费" },
  { name: "Krea", desc: "实时画布，边画边出图，支持局部重绘与超分", cat: "图像生成", tags: ["绘画","实时","重绘"], url: "https://www.krea.ai", price: "免费+付费" },
  { name: "ComfyUI", desc: "节点式绘画工作流，可玩性最高，适合进阶玩家", cat: "图像生成", tags: ["绘画","开源","工作流","本地部署"], url: "https://www.comfy.org", price: "免费" },
  { name: "Playground", desc: "在线绘画工具，免费额度大方，适合日常快速出图", cat: "图像生成", tags: ["绘画","在线","免费"], url: "https://playground.com", price: "免费+付费" },
  { name: "Bing 图像创建", desc: "微软免费绘图，基于 DALL·E 3，无需注册即可用", cat: "图像生成", tags: ["绘画","免费","微软","DALL·E"], url: "https://www.bing.com/images/create", price: "免费" },
  { name: "堆友", desc: "阿里出品的在线设计工具，电商海报与模特图常用", cat: "图像生成", tags: ["设计","国产","电商","海报"], url: "https://d.design", price: "免费+付费" },
  { name: "Niji Journey", desc: "专注二次元与动漫风格，出图氛围感强", cat: "图像生成", tags: ["绘画","二次元","动漫"], url: "https://nijijourney.com", price: "付费" },

  // ============ 视频生成 10 ============
  { name: "Sora", desc: "OpenAI 的视频生成模型，画面连贯性与物理感领先", cat: "视频生成", tags: ["视频","文生视频","OpenAI"], url: "https://sora.com", price: "付费" },
  { name: "可灵", desc: "快手出品，中文提示词友好，生成速度快、画质高", cat: "视频生成", tags: ["视频","国产","文生视频"], url: "https://klingai.com", price: "免费+付费" },
  { name: "Runway", desc: "老牌 AI 视频工具，编辑功能齐全，影视从业者常用", cat: "视频生成", tags: ["视频","剪辑","特效"], url: "https://runwayml.com", price: "免费+付费" },
  { name: "海螺 AI", desc: "MiniMax 出品，视频与语音能力兼具，国内可直连", cat: "视频生成", tags: ["视频","国产","语音"], url: "https://hailuoai.com", price: "免费+付费" },
  { name: "Vidu", desc: "清华系视频模型，首尾帧控制精准，国产直连", cat: "视频生成", tags: ["视频","国产","首尾帧"], url: "https://www.vidu.cn", price: "免费+付费" },
  { name: "Luma Dream Machine", desc: "一键生成高质量视频，镜头运动自然，免费额度可用", cat: "视频生成", tags: ["视频","文生视频","运镜"], url: "https://lumalabs.ai", price: "免费+付费" },
  { name: "Pika", desc: "操作简单，特效玩法多，适合做趣味短视频", cat: "视频生成", tags: ["视频","特效","趣味"], url: "https://pika.art", price: "免费+付费" },
  { name: "HeyGen", desc: "数字人视频生成，口型同步精准，做口播与多语种视频", cat: "视频生成", tags: ["数字人","口播","翻译视频"], url: "https://www.heygen.com", price: "付费" },
  { name: "腾讯智影", desc: "腾讯出品的视频创作平台，数字人与智能剪辑一体", cat: "视频生成", tags: ["数字人","剪辑","国产","腾讯"], url: "https://zenvideo.qq.com", price: "免费+付费" },
  { name: "剪映", desc: "国民级剪辑工具，AI 成片、智能字幕大幅提速", cat: "视频生成", tags: ["剪辑","字幕","国产","抖音"], url: "https://www.capcut.cn", price: "免费+付费" },

  // ============ 编程开发 14 ============
  { name: "GitHub Copilot", desc: "VS Code 中最成熟的 AI 补全，写代码的老搭档", cat: "编程开发", tags: ["代码","补全","IDE"], url: "https://github.com/features/copilot", price: "付费" },
  { name: "Cursor", desc: "AI 原生编辑器，能直接改整个项目，写代码效率高", cat: "编程开发", tags: ["代码","编辑器","IDE"], url: "https://cursor.com", price: "免费+付费" },
  { name: "Trae", desc: "字节出品的免费 AI 编程工具，中文体验好", cat: "编程开发", tags: ["代码","编辑器","国产"], url: "https://www.trae.ai", price: "免费" },
  { name: "v0", desc: "一句话生成网页前端界面，适合快速做原型页面", cat: "编程开发", tags: ["前端","UI","原型"], url: "https://v0.app", price: "免费+付费" },
  { name: "Bolt.new", desc: "浏览器里直接写、跑、部署完整应用，零环境配置", cat: "编程开发", tags: ["前端","全栈","部署"], url: "https://bolt.new", price: "免费+付费" },
  { name: "通义灵码", desc: "阿里出品的代码助手，支持中文注释生成与单元测试", cat: "编程开发", tags: ["代码","国产","阿里","补全"], url: "https://tongyi.aliyun.com/lingma", price: "免费" },
  { name: "文心快码", desc: "百度出品的代码助手，中文场景与注释理解好", cat: "编程开发", tags: ["代码","国产","百度"], url: "https://comate.baidu.com", price: "免费" },
  { name: "Codeium", desc: "免费额度大的代码补全工具，支持 70+ 种语言", cat: "编程开发", tags: ["代码","补全","免费"], url: "https://codeium.com", price: "免费+付费" },
  { name: "Windsurf", desc: "AI 流式编辑器，Cascade 代理能自主完成多步改动", cat: "编程开发", tags: ["代码","编辑器","Agent"], url: "https://windsurf.com", price: "免费+付费" },
  { name: "Replit", desc: "在线 IDE + AI 助手，打开浏览器就能写完整项目", cat: "编程开发", tags: ["代码","在线IDE","协作"], url: "https://replit.com", price: "免费+付费" },
  { name: "Lovable", desc: "描述需求直接生成可上线的全栈应用，适合做 MVP", cat: "编程开发", tags: ["全栈","原型","MVP"], url: "https://lovable.dev", price: "免费+付费" },
  { name: "Cognition", desc: "Devin 背后的公司，主打自主完成工程任务的 AI 工程师", cat: "编程开发", tags: ["Agent","代码","自动化"], url: "https://cognition.ai", price: "付费" },
  { name: "Zed", desc: "高性能代码编辑器，启动极快，内置 AI 协作", cat: "编程开发", tags: ["编辑器","性能","协作"], url: "https://zed.dev", price: "免费+付费" },
  { name: "Augment Code", desc: "面向大型代码库的 AI 助手，索引能力强，企业级", cat: "编程开发", tags: ["代码","大项目","企业级"], url: "https://www.augmentcode.com", price: "免费+付费" },

  // ============ 写作办公 12 ============
  { name: "Notion AI", desc: "在笔记里直接改写、总结、翻译，知识管理首选", cat: "写作办公", tags: ["笔记","写作","总结"], url: "https://www.notion.so/product/ai", price: "付费" },
  { name: "Grammarly", desc: "英文语法与润色神器，写邮件论文必备", cat: "写作办公", tags: ["英文","润色","语法"], url: "https://www.grammarly.com", price: "免费+付费" },
  { name: "WPS AI", desc: "金山办公内置 AI，写文档、做表格 PPT 直接在 Office 里用", cat: "写作办公", tags: ["办公","文档","PPT","国产"], url: "https://www.wps.cn/ai", price: "免费+付费" },
  { name: "Gamma", desc: "输入主题自动生成排版精美的 PPT，省去排版时间", cat: "写作办公", tags: ["PPT","演示","设计"], url: "https://gamma.app", price: "免费+付费" },
  { name: "飞书智能伙伴", desc: "飞书内置的 AI 助手，会读文档、能写周报、懂流程", cat: "写作办公", tags: ["办公","协作","国产","字节"], url: "https://www.feishu.cn", price: "免费+付费" },
  { name: "腾讯文档 AI", desc: "在线文档内置 AI，多人协作时可直接生成与整理内容", cat: "写作办公", tags: ["办公","协作","国产","腾讯"], url: "https://docs.qq.com", price: "免费" },
  { name: "秘塔写作猫", desc: "中文写作助手，纠错、润色、改写一站式", cat: "写作办公", tags: ["写作","润色","国产","纠错"], url: "https://xiezuocat.com", price: "免费+付费" },
  { name: "笔灵 AI", desc: "中文场景写作，覆盖公文、论文、新媒体等多种文体", cat: "写作办公", tags: ["写作","公文","论文","国产"], url: "https://biling.qianp.com", price: "免费+付费" },
  { name: "讯飞听见", desc: "语音转文字准确率高，会议录音一键成稿", cat: "写作办公", tags: ["转写","会议","语音","国产"], url: "https://www.iflyrec.com", price: "免费+付费" },
  { name: "Otter.ai", desc: "英文会议记录神器，实时转写并自动生成摘要", cat: "写作办公", tags: ["转写","会议","英文","摘要"], url: "https://otter.ai", price: "免费+付费" },
  { name: "Notta", desc: "支持多语种的录音转写，会议纪要自动提炼待办", cat: "写作办公", tags: ["转写","会议","多语种"], url: "https://www.notta.ai", price: "免费+付费" },
  { name: "ChatPDF", desc: "上传 PDF 直接对话提问，读文献报告不用逐页翻", cat: "写作办公", tags: ["PDF","阅读","文献","问答"], url: "https://www.chatpdf.com", price: "免费+付费" },

  // ============ 音频音乐 8 ============
  { name: "Suno", desc: "输入歌词与曲风就能生成完整歌曲，含人声演唱", cat: "音频音乐", tags: ["音乐","作曲","人声"], url: "https://suno.com", price: "免费+付费" },
  { name: "ElevenLabs", desc: "拟真度极高的 AI 配音，支持声音克隆与多语种", cat: "音频音乐", tags: ["配音","TTS","克隆"], url: "https://elevenlabs.io", price: "免费+付费" },
  { name: "Udio", desc: "音乐生成质量出色，风格控制细腻", cat: "音频音乐", tags: ["音乐","作曲"], url: "https://udio.com", price: "免费+付费" },
  { name: "魔音工坊", desc: "国内常用 AI 配音工具，音色丰富，短视频配音首选", cat: "音频音乐", tags: ["配音","国产","短视频"], url: "https://www.moyin.com", price: "免费+付费" },
  { name: "TTSMaker", desc: "免费文本转语音，无需注册，支持长文本批量合成", cat: "音频音乐", tags: ["配音","TTS","免费"], url: "https://ttsmaker.com", price: "免费" },
  { name: "网易天音", desc: "网易出品的 AI 音乐创作平台，中文歌词配曲好用", cat: "音频音乐", tags: ["音乐","国产","网易","作曲"], url: "https://tianyin.music.163.com", price: "免费+付费" },
  { name: "Mubert", desc: "按情绪与时长生成背景音乐，适合视频配乐与直播", cat: "音频音乐", tags: ["音乐","BGM","配乐"], url: "https://mubert.com", price: "免费+付费" },
  { name: "LALAL.ai", desc: "人声与伴奏分离，提取干声或消音做伴奏都好用", cat: "音频音乐", tags: ["分离","人声","伴奏","音频处理"], url: "https://www.lalal.ai", price: "免费+付费" },

  // ============ 搜索研究 10 ============
  { name: "Perplexity", desc: "AI 搜索问答，每条答案都给出处，查资料最省心", cat: "搜索研究", tags: ["搜索","问答","引用"], url: "https://www.perplexity.ai", price: "免费+付费" },
  { name: "秘塔 AI 搜索", desc: "中文 AI 搜索，无广告、结果结构化，支持全网/学术", cat: "搜索研究", tags: ["搜索","国产","学术"], url: "https://metaso.cn", price: "免费" },
  { name: "Elicit", desc: "面向科研的文献助手，自动提取论文结论与数据", cat: "搜索研究", tags: ["论文","学术","文献"], url: "https://elicit.com", price: "免费+付费" },
  { name: "Consensus", desc: "基于真实论文回答科学问题，验证传言的好工具", cat: "搜索研究", tags: ["论文","学术","科普"], url: "https://consensus.app", price: "免费+付费" },
  { name: "纳米 AI", desc: "360 出品的 AI 搜索，多模型聚合，回答带引用来源", cat: "搜索研究", tags: ["搜索","国产","360","引用"], url: "https://www.n.cn", price: "免费" },
  { name: "天工 AI", desc: "昆仑万维出品，搜索与创作一体，支持长文生成", cat: "搜索研究", tags: ["搜索","国产","创作"], url: "https://www.tiangong.cn", price: "免费" },
  { name: "知乎直答", desc: "基于知乎内容库的 AI 问答，找经验帖与真实评价", cat: "搜索研究", tags: ["搜索","国产","知乎","问答"], url: "https://zhida.zhihu.com", price: "免费" },
  { name: "NotebookLM", desc: "Google 出品的资料助手，上传文档即可对话与生成摘要", cat: "搜索研究", tags: ["阅读","笔记","Google","播客"], url: "https://notebooklm.google.com", price: "免费" },
  { name: "Semantic Scholar", desc: "AI 驱动的学术搜索，语义检索比关键词更准", cat: "搜索研究", tags: ["论文","学术","搜索"], url: "https://www.semanticscholar.org", price: "免费" },
  { name: "Connected Papers", desc: "把论文关系画成图谱，快速摸清一个研究领域", cat: "搜索研究", tags: ["论文","图谱","学术","可视化"], url: "https://www.connectedpapers.com", price: "免费+付费" },

  // ============ 设计创意 9 ============
  { name: "Figma AI", desc: "主流 UI 设计工具，内置 AI 生成与自动布局", cat: "设计创意", tags: ["UI","设计","协作"], url: "https://www.figma.com", price: "免费+付费" },
  { name: "Canva", desc: "零基础做图神器，模板海量，海报简历封面一键出", cat: "设计创意", tags: ["设计","海报","模板"], url: "https://www.canva.com", price: "免费+付费" },
  { name: "MasterGo", desc: "国产在线设计工具，Figma 替代品，中文协作友好", cat: "设计创意", tags: ["UI","设计","国产"], url: "https://mastergo.com", price: "免费+付费" },
  { name: "即时设计", desc: "国产 UI 设计工具，资源广场素材丰富，免费够用", cat: "设计创意", tags: ["UI","设计","国产","资源"], url: "https://js.design", price: "免费+付费" },
  { name: "Pixso", desc: "一体化在线设计协作工具，支持原型与交付", cat: "设计创意", tags: ["UI","原型","国产","协作"], url: "https://pixso.cn", price: "免费+付费" },
  { name: "稿定设计", desc: "国内模板量最大的在线设计站，电商新媒体素材齐全", cat: "设计创意", tags: ["设计","模板","电商","国产"], url: "https://www.gaoding.com", price: "免费+付费" },
  { name: "创客贴", desc: "拖拖拽拽做图，公众号封面、海报、简历模板丰富", cat: "设计创意", tags: ["设计","模板","国产","新媒体"], url: "https://www.chuangkit.com", price: "免费+付费" },
  { name: "Remove.bg", desc: "一键抠图去除背景，免费版就够日常使用", cat: "设计创意", tags: ["抠图","图片处理","免费"], url: "https://www.remove.bg", price: "免费+付费" },
  { name: "标小智", desc: "输入品牌名自动生成 Logo，创业做品牌标识起步快", cat: "设计创意", tags: ["Logo","品牌","国产"], url: "https://www.logosc.cn", price: "免费+付费" },

  // ============ 自动化 10 ============
  { name: "Coze", desc: "零代码搭建 AI 机器人，可发布到微信、飞书等平台", cat: "自动化", tags: ["Bot","智能体","国产"], url: "https://www.coze.cn", price: "免费+付费" },
  { name: "Dify", desc: "开源 LLM 应用开发平台，可私有化部署，做企业知识库", cat: "自动化", tags: ["智能体","开源","知识库"], url: "https://dify.ai", price: "免费+付费" },
  { name: "n8n", desc: "可视化工作流自动化，连接几百个应用，可自托管", cat: "自动化", tags: ["工作流","自动化","开源"], url: "https://n8n.io", price: "免费+付费" },
  { name: "Make", desc: "图形化自动化编排，无需代码串联各类 SaaS 服务", cat: "自动化", tags: ["工作流","自动化"], url: "https://www.make.com", price: "免费+付费" },
  { name: "Zapier", desc: "老牌自动化平台，集成应用数量最多，模板丰富", cat: "自动化", tags: ["工作流","自动化","集成"], url: "https://zapier.com", price: "免费+付费" },
  { name: "FastGPT", desc: "开源知识库问答系统，可视化编排工作流，可私有化", cat: "自动化", tags: ["知识库","开源","国产","问答"], url: "https://fastgpt.in", price: "免费+付费" },
  { name: "LangChain", desc: "最流行的 LLM 应用开发框架，做 RAG 与智能体的基础设施", cat: "自动化", tags: ["开发框架","开源","RAG","Agent"], url: "https://www.langchain.com", price: "免费" },
  { name: "AutoGPT", desc: "自主任务执行的开源项目，AI Agent 的启蒙之作", cat: "自动化", tags: ["Agent","开源","自主"], url: "https://github.com/Significant-Gravitas/AutoGPT", price: "免费" },
  { name: "影刀 RPA", desc: "国产 RPA 工具，模拟鼠标键盘自动处理重复性工作", cat: "自动化", tags: ["RPA","国产","效率","爬虫"], url: "https://www.yingdao.com", price: "免费+付费" },
  { name: "BetterYeah", desc: "企业级 AI 应用开发平台，业务编排与知识库一体", cat: "自动化", tags: ["企业级","知识库","国产","编排"], url: "https://www.betteryeah.com", price: "免费+付费" },

  // ============ 模型社区 8 ============
  { name: "Hugging Face", desc: "全球最大的开源模型与数据集社区，新模型首发地", cat: "模型社区", tags: ["开源","模型","数据集","社区"], url: "https://huggingface.co", price: "免费" },
  { name: "魔搭 ModelScope", desc: "阿里开源的模型社区，国内下载快，中文模型多", cat: "模型社区", tags: ["开源","国产","模型","阿里"], url: "https://www.modelscope.cn", price: "免费" },
  { name: "Civitai", desc: "Stable Diffusion 模型与 LoRA 的分享社区，资源极多", cat: "模型社区", tags: ["模型","LoRA","绘画","社区"], url: "https://civitai.com", price: "免费" },
  { name: "Ollama", desc: "一条命令在本地跑大模型，命令行玩家的标配", cat: "模型社区", tags: ["本地部署","开源","命令行"], url: "https://ollama.com", price: "免费" },
  { name: "LM Studio", desc: "带图形界面的本地大模型工具，不用敲命令就能跑", cat: "模型社区", tags: ["本地部署","GUI","开源"], url: "https://lmstudio.ai", price: "免费" },
  { name: "硅基流动", desc: "国内模型 API 聚合平台，多家大模型一键调用与计费", cat: "模型社区", tags: ["API","国产","聚合","推理"], url: "https://siliconflow.cn", price: "免费+付费" },
  { name: "OpenRouter", desc: "一个 API 调用几百个模型，自动选最低价与最快通道", cat: "模型社区", tags: ["API","聚合","对比","路由"], url: "https://openrouter.ai", price: "免费+付费" },
  { name: "GitHub", desc: "全球最大代码托管平台，找开源 AI 项目的第一站", cat: "模型社区", tags: ["开源","代码","社区","项目"], url: "https://github.com", price: "免费+付费" },

  // ============ 提示词 5 ============
  { name: "提示词工程指南", desc: "系统讲解 Prompt 写法的中文站，从入门到进阶", cat: "提示词", tags: ["提示词","教程","Prompt","学习"], url: "https://www.promptingguide.ai", price: "免费" },
  { name: "FlowGPT", desc: "海量提示词分享社区，直接复制使用或改造", cat: "提示词", tags: ["提示词","社区","Prompt"], url: "https://flowgpt.com", price: "免费+付费" },
  { name: "PromptPerfect", desc: "自动优化提示词，把一句话扩写成结构化指令", cat: "提示词", tags: ["提示词","优化","工具"], url: "https://promptperfect.jina.ai", price: "免费+付费" },
  { name: "LangGPT", desc: "结构化提示词方法论，把提示词当代码一样写", cat: "提示词", tags: ["提示词","方法论","结构化","国产"], url: "https://langgptai.feishu.cn", price: "免费" },
  { name: "Awesome Prompts", desc: "GitHub 上的提示词合集，收录各种角色与场景模板", cat: "提示词", tags: ["提示词","开源","模板","GitHub"], url: "https://github.com/f/awesome-chatgpt-prompts", price: "免费" },

  // ============ 学习教程 6 ============
  { name: "DeepLearning.AI", desc: "吴恩达创办，课程质量高，很多课短期免费学完", cat: "学习教程", tags: ["课程","教程","吴恩达","系统"], url: "https://www.deeplearning.ai", price: "免费+付费" },
  { name: "fast.ai", desc: "从实践入手学深度学习，不讲公式先教会你跑起来", cat: "学习教程", tags: ["课程","教程","实践","开源"], url: "https://www.fast.ai", price: "免费" },
  { name: "动手学深度学习", desc: "中文经典教材，代码可运行，理论与实操并重", cat: "学习教程", tags: ["课程","中文","教材","开源"], url: "https://zh.d2l.ai", price: "免费" },
  { name: "Hugging Face 课程", desc: "官方免费课，覆盖 NLP、扩散模型与 Agent 实战", cat: "学习教程", tags: ["课程","免费","实战","开源"], url: "https://huggingface.co/learn", price: "免费" },
  { name: "李宏毅机器学习", desc: "台大经典课程，中文讲解幽默易懂，讲义全公开", cat: "学习教程", tags: ["课程","中文","视频","大学"], url: "https://speech.ee.ntu.edu.tw/~hylee/ml/", price: "免费" },
  { name: "Google ML 速成课", desc: "谷歌官方短期课程，适合快速建立机器学习框架认知", cat: "学习教程", tags: ["课程","免费","Google","入门"], url: "https://developers.google.com/machine-learning/crash-course", price: "免费" },
];
