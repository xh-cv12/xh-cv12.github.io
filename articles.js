/* ============================================================
 * articles.js —— 资讯与学习资源（30 个信息源）
 * ------------------------------------------------------------
 * 这里收录的不是「某一篇文章」，而是持续更新的信息源。
 * 理由：单篇文章链接会失效，信息源不会。
 *
 * 字段说明：
 *   platform  展示用的类型标签：公众号 / 网站 / 邮件订阅 / 社区
 *   cat       分类（必须是 ARTICLE_CATS 里的某一个）
 *   freq      更新频率，如「日更」「周更」
 *   wx        微信公众号 ID（有就填，页面上会显示"微信搜索：xxx"）
 * ============================================================ */

const ARTICLE_CATS = [
  "全部",
  "中文资讯",
  "国际资讯",
  "邮件订阅",
  "社区论坛",
  "深度专栏",
];

const ARTICLES = [
  // ============ 中文资讯 10 ============
  {
    name: "量子位",
    desc: "中文 AI 圈影响力 TOP，热点最快，模型评测与行业动态全覆盖",
    platform: "公众号", cat: "中文资讯", freq: "日更", wx: "QbitAI",
    tags: ["快讯","评测","国内","产业"], url: "https://www.qbitai.com",
  },
  {
    name: "机器之心",
    desc: "技术深度派，顶会论文解读、模型架构分析、开源项目评测",
    platform: "公众号", cat: "中文资讯", freq: "日更", wx: "almosthuman2014",
    tags: ["论文","技术","深度","学术"], url: "https://www.jiqizhixin.com",
  },
  {
    name: "新智元",
    desc: "聚焦 AI 产业落地，大模型排行榜、行业案例与政策解读",
    platform: "公众号", cat: "中文资讯", freq: "日更", wx: "AI_era",
    tags: ["产业","政策","排行榜","国内"], url: "https://www.aiera.com.cn",
  },
  {
    name: "AI 科技评论",
    desc: "雷峰网旗下，偏学术与技术解读，常有大咖专访",
    platform: "公众号", cat: "深度专栏", freq: "日更", wx: "aitechtalk",
    tags: ["学术","专访","技术","深度"], url: "https://www.leiphone.com",
  },
  {
    name: "智能涌现",
    desc: "36 氪旗下，聚焦 AI 创业与商业化，创始人访谈多",
    platform: "公众号", cat: "中文资讯", freq: "日更", wx: "SmartEmergence",
    tags: ["创业","商业","访谈","36氪"], url: "https://weixin.sogou.com/weixin?type=1&query=智能涌现",
  },
  {
    name: "海外独角兽",
    desc: "拾象科技出品，专做海外 AI 公司深度研究，长文质量高",
    platform: "公众号", cat: "深度专栏", freq: "周更", wx: "Monolith-Capital",
    tags: ["海外","深度","研究","投资"], url: "https://weixin.sogou.com/weixin?type=1&query=海外独角兽",
  },
  {
    name: "Founder Park",
    desc: "极客公园旗下，偏创业者视角，AI 应用与产品方法论",
    platform: "公众号", cat: "中文资讯", freq: "周更", wx: "founderpark01",
    tags: ["创业","产品","方法论","访谈"], url: "https://weixin.sogou.com/weixin?type=1&query=Founder Park",
  },
  {
    name: "36 氪 · AI",
    desc: "主流科技媒体的 AI 频道，融资与商业动态更新及时",
    platform: "网站", cat: "中文资讯", freq: "日更",
    tags: ["商业","融资","资讯","科技"], url: "https://36kr.com/information/AI/",
  },
  {
    name: "InfoQ 中国",
    desc: "面向技术决策者，AI 工程落地与架构实践内容扎实",
    platform: "网站", cat: "中文资讯", freq: "日更",
    tags: ["工程","架构","落地","技术"], url: "https://www.infoq.cn",
  },
  {
    name: "腾讯研究院",
    desc: "偏政策、社会影响与合规研究，产出权威白皮书",
    platform: "网站", cat: "深度专栏", freq: "周更",
    tags: ["政策","研究报告","合规","白皮书"], url: "https://www.tisi.org",
  },

  // ============ 国际资讯 8 ============
  {
    name: "Hugging Face Blog",
    desc: "几乎所有开源模型的首发地，发布即带技术细节",
    platform: "网站", cat: "国际资讯", freq: "日更",
    tags: ["开源","模型","首发","技术"], url: "https://huggingface.co/blog",
  },
  {
    name: "TechCrunch AI",
    desc: "全球科技媒体 AI 频道，融资与产品发布消息最快",
    platform: "网站", cat: "国际资讯", freq: "日更",
    tags: ["融资","产品","海外","科技"], url: "https://techcrunch.com/category/artificial-intelligence/",
  },
  {
    name: "The Verge AI",
    desc: "科技媒体报道 + 测评，文风轻松，适合泛读",
    platform: "网站", cat: "国际资讯", freq: "日更",
    tags: ["产品","测评","海外","资讯"], url: "https://www.theverge.com/ai-artificial-intelligence",
  },
  {
    name: "arXiv cs.AI",
    desc: "论文预印本平台，比正式发表早数月看到研究方向",
    platform: "网站", cat: "国际资讯", freq: "日更",
    tags: ["论文","学术","前沿","预印本"], url: "https://arxiv.org/list/cs.AI/recent",
  },
  {
    name: "Papers with Code",
    desc: "论文与代码对照查看，还能看到各任务的 SOTA 排行",
    platform: "网站", cat: "国际资讯", freq: "日更",
    tags: ["论文","代码","排行榜","学术"], url: "https://paperswithcode.com",
  },
  {
    name: "OpenAI Blog",
    desc: "OpenAI 官方发布渠道，新模型与功能的第一手说明",
    platform: "网站", cat: "国际资讯", freq: "不定期",
    tags: ["官方","OpenAI","发布","一手"], url: "https://openai.com/blog",
  },
  {
    name: "Google DeepMind",
    desc: "DeepMind 官方研究博客，Gemini 等模型的发布阵地",
    platform: "网站", cat: "国际资讯", freq: "不定期",
    tags: ["官方","Google","研究","发布"], url: "https://deepmind.google/discover/blog/",
  },
  {
    name: "Anthropic News",
    desc: "Claude 背后的官方博客，模型能力与安全研究同步",
    platform: "网站", cat: "国际资讯", freq: "不定期",
    tags: ["官方","Claude","安全","发布"], url: "https://www.anthropic.com/news",
  },

  // ============ 邮件订阅 7 ============
  {
    name: "The Batch",
    desc: "吴恩达亲笔，每周解读本周最重要进展，讲得最明白",
    platform: "邮件订阅", cat: "邮件订阅", freq: "周更",
    tags: ["周刊","吴恩达","解读","入门友好"], url: "https://www.deeplearning.ai/the-batch/",
  },
  {
    name: "The Rundown AI",
    desc: "全球订阅量最大的 AI 日报，每天 5 分钟掌握全貌",
    platform: "邮件订阅", cat: "邮件订阅", freq: "日更",
    tags: ["日报","速览","全球","入门友好"], url: "https://www.therundown.ai",
  },
  {
    name: "TLDR AI",
    desc: "工程师最爱的日报，标题+两句摘要，分拣效率极高",
    platform: "邮件订阅", cat: "邮件订阅", freq: "日更",
    tags: ["日报","工程师","简洁","开源"], url: "https://tldr.tech/ai",
  },
  {
    name: "Import AI",
    desc: "Jack Clark 主笔，AI 研究与政策地缘的交叉视角",
    platform: "邮件订阅", cat: "深度专栏", freq: "周更",
    tags: ["政策","研究","深度","地缘"], url: "https://importai.substack.com",
  },
  {
    name: "Ben's Bites",
    desc: "面向构建者，新工具与产品发布密度最高",
    platform: "邮件订阅", cat: "邮件订阅", freq: "日更",
    tags: ["工具","产品","开发者","日报"], url: "https://www.bensbites.com",
  },
  {
    name: "Interconnects",
    desc: "Nathan Lambert 主笔，开源模型与 RLHF 的最前沿评论",
    platform: "邮件订阅", cat: "深度专栏", freq: "周更",
    tags: ["开源","RLHF","训练","技术"], url: "https://www.interconnects.ai",
  },
  {
    name: "阮一峰科技周刊",
    desc: "中文老牌周刊，每周五发布，工具和资源栏目常收录 AI 项目",
    platform: "邮件订阅", cat: "邮件订阅", freq: "周更",
    tags: ["中文","周刊","工具","资源"], url: "https://github.com/ruanyf/weekly",
  },

  // ============ 社区论坛 5 ============
  {
    name: "r/LocalLLaMA",
    desc: "本地跑大模型的第一社区，折腾显卡和量化必看",
    platform: "社区", cat: "社区论坛", freq: "日更",
    tags: ["本地部署","开源","Reddit","折腾"], url: "https://www.reddit.com/r/LocalLLaMA/",
  },
  {
    name: "Hacker News",
    desc: "硅谷技术圈风向标，AI 大新闻的讨论质量很高",
    platform: "社区", cat: "社区论坛", freq: "日更",
    tags: ["讨论","技术","海外","风向标"], url: "https://news.ycombinator.com",
  },
  {
    name: "GitHub Trending",
    desc: "每天看哪些开源项目在涨星，发现新工具最快的方式",
    platform: "社区", cat: "社区论坛", freq: "日更",
    tags: ["开源","项目","发现","排行榜"], url: "https://github.com/trending",
  },
  {
    name: "Product Hunt",
    desc: "新产品发布的第一现场，很多 AI 工具在这首发",
    platform: "社区", cat: "社区论坛", freq: "日更",
    tags: ["新产品","首发","工具","排行榜"], url: "https://www.producthunt.com",
  },
  {
    name: "魔搭社区",
    desc: "国内版 Hugging Face，中文模型多，下载速度快",
    platform: "社区", cat: "社区论坛", freq: "日更",
    tags: ["国产","开源","模型","社区"], url: "https://www.modelscope.cn",
  },
];
