interface Character {
  name: string
  role: string
  relationships: string[]
}

interface TimelineEvent {
  event: string
  order: number
}

interface PlotNode {
  title: string
  description: string
  type: 'climax' | 'turning_point' | 'resolution' | 'exposition'
}

interface Gap {
  position: string
  type: 'missing_plot' | 'logic_gap'
  description: string
  suggestion: string
}

interface Score {
  overall: number
  characterDepth: number
  plotCoherence: number
  timelineCompleteness: number
  logicalConsistency: number
}

interface AnalyzeResult {
  characters: Character[]
  timeline: TimelineEvent[]
  plotNodes: PlotNode[]
  gaps: Gap[]
  score: Score
}

interface OptimizeSuggestion {
  original: string
  optimized: string
  reason: string
}

interface OptimizeResult {
  style: 'children' | 'literary'
  suggestions: OptimizeSuggestion[]
}

const CHINESE_SURNAMES = [
  '赵','钱','孙','李','周','吴','郑','王','冯','陈','褚','卫','蒋','沈',
  '韩','杨','朱','秦','尤','许','何','吕','施','张','孔','曹','严','华',
  '金','魏','陶','姜','戚','谢','邹','喻','柏','水','窦','章','云','苏',
  '潘','葛','奚','范','彭','郎','鲁','韦','昌','马','苗','凤','花','方',
  '俞','任','袁','柳','鲍','史','唐','费','廉','岑','薛','雷','贺','倪',
  '汤','滕','殷','罗','毕','郝','邬','安','常','乐','于','时','傅','皮',
  '卞','齐','康','伍','余','元','卜','顾','孟','平','黄','和','穆','萧',
  '尹','姚','邵','湛','汪','祁','毛','禹','狄','米','贝','明','臧','计',
  '伏','成','戴','谈','宋','茅','庞','熊','纪','舒','屈','项','祝','董',
  '梁','杜','阮','蓝','闵','席','季','麻','强','贾','路','娄','危','江',
  '童','颜','郭','梅','盛','林','刁','钟','徐','邱','骆','高','夏','蔡',
  '田','樊','胡','凌','霍','虞','万','支','柯','管','卢','莫','经','房',
  '裘','缪','干','解','应','宗','丁','宣','贲','邓','郁','单','杭','洪',
  '包','诸','左','石','崔','吉','钮','龚','程','嵇','邢','裴','陆','荣',
  '翁','荀','羊','惠','甄','家','封','芮','羿','储','靳','汲','邴','糜',
  '松','井','段','富','巫','乌','焦','巴','弓','牧','山','谷','车','侯',
  '全','班','仰','秋','仲','伊','宫','宁','仇','栾','暴','甘','厉','戎',
  '祖','武','符','刘','景','詹','束','龙','叶','幸','司','韶','黎','薄',
  '印','宿','白','怀','蒲','从','鄂','索','咸','籍','赖','卓','屠','蒙',
  '池','乔','阴','胥','苍','双','闻','党','翟','谭','贡','劳','逄','姬',
  '申','扶','冉','宰','雍','桑','桂','牛','寿','通','边','燕','浦','尚',
  '温','别','庄','晏','柴','瞿','阎','充','慕','连','茹','习','宦','艾',
  '鱼','容','向','古','易','慎','戈','廖','庾','居','衡','步','都','耿',
  '满','弘','匡','国','文','寇','广','禄','东','沃','利','蔚','越','隆',
  '师','巩','聂','晁','勾','敖','融','冷','辛','阚','那','简','饶','空',
  '曾','毋','沙','养','鞠','须','丰','巢','关','查','后','荆','红','游',
  '竺','权','盖','益','桓','公',
]

const COMPOUND_SURNAMES = [
  '欧阳','上官','皇甫','司马','夏侯','诸葛','东方','西门','南宫','北堂',
  '慕容','公孙','令狐','宇文','长孙','轩辕','独孤','拓跋','端木','百里',
]

const TIME_MARKERS_CN = [
  '早上','上午','中午','下午','傍晚','晚上','深夜','凌晨',
  '昨天','今天','明天','前天','后天',
  '一年后','三年后','几天后','数日后','不久后','随后','接着','后来','终于',
  '这时','那时','当时','此刻','此时','那时起','从那以后','多年后','几个月后',
  '几周后','几天后','数年后','半天后','片刻后','不一会儿','过了一会儿',
  '春','夏','秋','冬','春天','夏天','秋天','冬天',
  '年初','年中','年末','月初','月底','周末',
  '黎明','拂晓','黄昏','日暮','正午',
]

const TIME_MARKERS_EN = [
  'morning','afternoon','evening','night','midnight','dawn','dusk',
  'yesterday','today','tomorrow','later','then','after','before',
  'suddenly','finally','eventually','meanwhile','afterwards',
  'years later','months later','days later','hours later',
  'spring','summer','autumn','winter',
  'once upon a time','at last','at that moment',
]

const DRAMA_MARKERS_CN = [
  '突然','忽然','竟然','居然','没想到','出乎意料','万万没想到',
  '终于','到底','究竟','原来','没想到','谁知','岂料',
  '不禁','忍不住','大吃一惊','震惊','愕然','目瞪口呆',
  '崩溃','绝望','惊喜','激动','愤怒','悲痛',
  '转折','危机','发现','揭开','真相','秘密',
  '冲突','决裂','背叛','牺牲','抉择',
  '高潮','结局','结局','尾声','落幕',
  '然而','但是','可是','不过','却','只是',
  '从此','于是','因此','所以','因为',
]

const DRAMA_MARKERS_EN = [
  'suddenly','unexpectedly','surprisingly','shockingly',
  'finally','at last','however','but','yet','nevertheless',
  'discovered','revealed','realized','understood',
  'conflict','betrayal','sacrifice','crisis','climax',
  'despair','hope','rage','terror','astonishment',
  'turning point','nevertheless','despite',
]

const EMOTION_PEAK_CN = [
  '怒','哭','笑','惊','惧','喜','悲','恨','痛','苦',
  '颤抖','发抖','泪','泪流满面','嚎啕大哭','潸然泪下',
  '仰天长叹','怒不可遏','欣喜若狂','心碎','心如刀割',
  '大怒','大惊','大喜','大悲','崩溃','绝望',
  '紧紧','拼命','猛地','猛然','骤然','陡然',
]

const EMOTION_PEAK_EN = [
  'trembled','wept','cried','laughed','screamed','shouted',
  'gasped','shuddered','collapsed','clutched','grasped',
  'desperately','fiercely','violently','intensely',
  'heartbroken','devastated','overjoyed','furious','terrified',
]

const TRANSITION_WORDS_CN = [
  '然而','但是','可是','不过','却','只是','虽然','尽管',
  '于是','因此','所以','因为','由于','既然',
  '接着','随后','然后','之后','后来','终于',
  '从此','自此','从那以后','一直以来',
  '与此同时','就在这时','恰在此时','正值此时',
  '不料','岂知','谁知','哪知',
  '不仅如此','除此以外','另外','此外',
  '总而言之','综上所述','最终','最后',
]

const ROLE_KEYWORDS: Record<string, string[]> = {
  '主角': ['是','有','会','能','想','要','去','来','说','做','看','听','觉得','认为','决定','发现'],
  '配角': ['告诉','帮忙','送','给','带','引','指'],
  '反派': ['阻','挡','害','骗','抢','夺','威胁','恐吓','陷害'],
}

function isChineseChar(char: string): boolean {
  const code = char.charCodeAt(0)
  return code >= 0x4e00 && code <= 0x9fff
}

function hasChineseText(text: string): boolean {
  for (let i = 0; i < Math.min(text.length, 100); i++) {
    if (isChineseChar(text[i])) return true
  }
  return false
}

function extractChineseNames(text: string): string[] {
  const rawNames = new Set<string>()
  const highConfidenceNames = new Set<string>()

  const topSurnames = [
    '王','李','张','刘','陈','杨','黄','赵','周','吴','徐','孙','胡','朱','高',
    '林','何','郭','马','罗','梁','宋','郑','谢','韩','唐','冯','于','董','萧',
    '程','曹','袁','邓','许','傅','沈','曾','彭','吕','苏','卢','蒋','蔡','贾',
    '丁','魏','薛','叶','阎','余','潘','杜','戴','夏','钟','汪','田','任','姜',
    '范','方','石','姚','谭','廖','邹','熊','金','陆','郝','孔','崔','康',
    '毛','邱','秦','江','史','顾','侯','邵','孟','龙','万','段','雷','钱','汤',
    '尹','黎','易','常','武','乔','贺','赖','龚','文',
  ]

  const nameIntroRegex = /(?:名叫|叫做|名为|名曰|叫)[\s]*([\u4e00-\u9fff]{2,4})(?=[，,。.！？!?、或者\s])/g
  let match: RegExpExecArray | null
  while ((match = nameIntroRegex.exec(text)) !== null) {
    const candidate = match[1]
    const badEndings = ['的','了','地','得','着','过','来','去','是','有','在','不','也','都','而','很','还','更','最','和','与','及','等','人','们','这','那','个','为','被','把','给','让','向','从','到','对','比','同','出','下','上','里','中','时','后','前','间','年','月','日','天']
    if (!badEndings.includes(candidate[candidate.length - 1]) && candidate.length >= 2 && candidate.length <= 4) {
      rawNames.add(candidate)
      highConfidenceNames.add(candidate)
    }
  }

  const nameCalledRegex = /(?:^|[。！？.!?\n\s，,；;：:])[^\u4e00-\u9fff]*([\u4e00-\u9fff]{2,3})(?:接着|连忙|急忙|立刻|马上)?(?:说道|喊道|叫道|问道|答道|笑道|哭道|叹道|吼道|嚷道)/gm
  while ((match = nameCalledRegex.exec(text)) !== null) {
    const candidate = match[1]
    if (candidate.length >= 2 && candidate.length <= 3) {
      rawNames.add(candidate)
      highConfidenceNames.add(candidate)
    }
  }

  for (const surname of COMPOUND_SURNAMES) {
    const regex = new RegExp('(?:^|[。！？.!?\n\s，,；;：:\"""\'])' + surname + '[\\u4e00-\\u9fff]{1,2}', 'g')
    while ((match = regex.exec(text)) !== null) {
      const name = match[0].replace(/^[。！？.!?\n\s，,；;：:""'\"]/, '')
      if (name.length >= 2 && name.length <= 4) {
        rawNames.add(name)
      }
    }
  }

  for (const surname of topSurnames) {
    const regex = new RegExp('(?:^|[。！？.!?\n\s，,；;：:\"""\'])' + surname + '[\\u4e00-\\u9fff]{1,2}', 'g')
    while ((match = regex.exec(text)) !== null) {
      const name = match[0].replace(/^[。！？.!?\n\s，,；;：:""'\"]/, '')
      if (name.length >= 2 && name.length <= 3) {
        const badEndings = ['人','们','的','了','地','得','着','过','来','去','是','有','在','不','也','都','而','且','或','如','很','还','更','最','和','与','及','等','出','下','上','里','中','时','后','前','间','年','月','日','天','个','为','这','那','被','把','给','让','向','从','到','对','比','同']
        if (!badEndings.includes(name[name.length - 1])) {
          rawNames.add(name)
        }
      }
    }
  }

  const titleNameRegex = /[小老大阿][\u4e00-\u9fff]{1}/g
  const excludeTitleNames = new Set(['小人','大人','老人','小孩','大汉','老夫','老者','大叔','大妈','大爷','大娘','大哥','大姐','小弟','小姐','小妹','老二','老三','大家','小伙','老外','大小','多少','小心','老大','老板','老天','老师','小偷','老鼠','小孩','小路','大门','大风','大火','大雨','大雪','小屋','大山','大河','小花','小草','大树','大海','小河','小鸟','小猪','小猫','小狗','老树','大路','老花','老和','小徒','老僧','老道','小僧','小道','老汉','大侠','大王','老王','小王','大兵','老总'])
  while ((match = titleNameRegex.exec(text)) !== null) {
    const name = match[0]
    if (!excludeTitleNames.has(name)) {
      const nameRegex = new RegExp(name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')
      const mentionCount = (text.match(nameRegex) || []).length
      if (mentionCount >= 2) {
        rawNames.add(name)
        highConfidenceNames.add(name)
      }
    }
  }

  const dialogVerbRegex = /([\u4e00-\u9fff]{2,3})(?:接着|连忙|急忙|立刻|马上)?(?:说道|喊道|叫道|问道|答道|笑道|哭道|叹道|吼道|嚷道)/g
  while ((match = dialogVerbRegex.exec(text)) !== null) {
    rawNames.add(match[1])
  }

  const simpleVerbRegex = /([\u4e00-\u9fff]{2})(?=说：|说道|喊道|问道|笑道)/g
  while ((match = simpleVerbRegex.exec(text)) !== null) {
    rawNames.add(match[1])
  }

  const commonFragments = new Set([
    '然后','于是','因此','但是','然而','突然','忽然','接着','后来','最终','所以','因为','虽然',
    '不过','可是','如果','只要','只有','什么','怎么','为什么','那个','这个','他们','我们','你们',
    '自己','别人','没有','不是','可以','已经','应该','可能','一定','其实','当然','一些','一样',
    '一直','一起','一般','一边','一切','一天','一种','一下','一点','这些','那些','每个','许多',
    '很多','所有','其他','还有','还是','只是','正是','总是','已是','先是','就在','这时','那时',
    '有人','就是','也是','又是','能在','会使','要去','来到','发现','觉得','认为','知道',
    '看到','听到','想到','走过','跑过','开始','继续','终于','到了','还有','正在','已经',
    '可以','就是','不过','虽然','但是','而且','或者','因为','所以','如果','于是','然后',
    '突然','忽然','果然','居然','竟然','照样','依然','仍然','当然','自然','显然',
    '仿佛','好像','似乎','简直','几乎','好朋友','同学们','走廊里','太阳出','太阳来',
    '操场上','天空中','向学校','拉着小','小红一','和小红','明和小','红的手',
    '拼命向','开心地','快跑吧','起床后','雨停了',
  ])

  const filtered = new Set<string>()
  for (const name of rawNames) {
    if (!commonFragments.has(name) && name.length >= 2 && name.length <= 4) {
      let hasBadWord = false
      const badInnerChars = ['的','了','在','是','有','不','和','与','及','等','也','都','而','很','更','最','把','被','给','让','向','从','到','对','比','同','为','这','那','个','着','过','地','得']
      for (const char of badInnerChars) {
        if (name.length > 2 && name.includes(char)) {
          hasBadWord = true
          break
        }
      }
      if (!hasBadWord) {
        filtered.add(name)
      }
    }
  }

  const finalNames: string[] = []
  const nameArray = Array.from(filtered)

  for (const name of nameArray) {
    const nameRegex = new RegExp(name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')
    const mentionCount = (text.match(nameRegex) || []).length

    if (!highConfidenceNames.has(name) && mentionCount < 2) {
      continue
    }

    const isSubsumedByBetter = nameArray.some(other => {
      if (other === name || other.length >= name.length) return false
      const otherRegex = new RegExp(other.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')
      const otherCount = (text.match(otherRegex) || []).length
      if (name.startsWith(other) && otherCount >= mentionCount) return true
      if (name.endsWith(other) && otherCount >= mentionCount) return true
      return false
    })

    if (!isSubsumedByBetter) {
      finalNames.push(name)
    }
  }

  finalNames.sort((a, b) => {
    const countA = (text.match(new RegExp(a.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length
    const countB = (text.match(new RegExp(b.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length
    return countB - countA
  })

  return finalNames.slice(0, 10)
}

function extractEnglishNames(text: string): string[] {
  const names = new Set<string>()

  const capitalizedRegex = /\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\b/g
  let match: RegExpExecArray | null
  const commonWords = new Set([
    'The','A','An','This','That','These','Those','It','He','She','They','We','I','You',
    'But','And','Or','Not','No','Yes','If','When','While','After','Before','Then','So',
    'However','Therefore','Moreover','Furthermore','Meanwhile','Suddenly','Finally',
    'There','Here','Where','What','Who','How','Why','Which','Whose',
    'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday',
    'January','February','March','April','May','June','July','August','September','October','November','December',
    'Spring','Summer','Autumn','Fall','Winter',
    'North','South','East','West',
    'New','Old','Great','Little','Big','Small',
  ])

  while ((match = capitalizedRegex.exec(text)) !== null) {
    const word = match[0]
    if (!commonWords.has(word) && word.length > 1) {
      names.add(word)
    }
  }

  const dialogRegex = /[""][^""]*[""]/g
  const dialogText = text.replace(dialogRegex, '')

  const titleNameRegex = /\b(?:Mr|Mrs|Miss|Ms|Dr|Sir|Lady|Lord|Professor|Captain|King|Queen|Prince|Princess)\.\s+([A-Z][a-z]+)/g
  while ((match = titleNameRegex.exec(text)) !== null) {
    names.add(match[1])
  }

  return Array.from(names)
}

function determineRole(text: string, name: string): string {
  const mentions = (text.match(new RegExp(name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length

  const protagonistActions = ROLE_KEYWORDS['主角']
  const antagonistActions = ROLE_KEYWORDS['反派']

  let protagScore = 0
  let antagScore = 0

  for (const action of protagonistActions) {
    if (text.includes(name + action) || text.includes(name) && text.includes(action)) protagScore++
  }

  for (const action of antagonistActions) {
    if (text.includes(name + action) || text.includes(name) && text.includes(action)) antagScore++
  }

  if (antagScore > protagScore && antagScore >= 1) return '反派'
  if (mentions >= 3 || protagScore >= 2) return '主角'
  if (mentions >= 2 || protagScore >= 1) return '重要配角'
  return '配角'
}

function findRelationships(text: string, name: string, allNames: string[]): string[] {
  const relationships: string[] = []

  const companionWords = ['和', '与', '跟', '同', '一起', '陪伴']
  const conflictWords = ['对抗', '冲突', '争吵', '争斗', '反对', '阻止', '敌']
  const familyWords = ['父', '母', '兄', '弟', '姐', '妹', '儿子', '女儿', '丈夫', '妻子', '爷爷', '奶奶']
  const helpWords = ['帮助', '救助', '保护', '照顾']
  const infoWords = ['告诉', '请教', '询问', '请求']
  const emotionWords = ['爱', '喜欢', '思念', '牵挂', '想念']

  for (const other of allNames) {
    if (other === name) continue
    if (!text.includes(name) || !text.includes(other)) continue

    const nameIdx = text.indexOf(name)
    const otherIdx = text.indexOf(other)
    const segment = text.substring(Math.min(nameIdx, otherIdx), Math.max(nameIdx, otherIdx) + Math.max(name.length, other.length))

    if (companionWords.some(w => segment.includes(w))) {
      relationships.push(`与${other}是伙伴关系`)
    } else if (conflictWords.some(w => segment.includes(w))) {
      relationships.push(`与${other}存在冲突`)
    } else if (familyWords.some(w => segment.includes(w))) {
      relationships.push(`与${other}有亲属关系`)
    } else {
      relationships.push(`与${other}有互动`)
    }
  }

  if (companionWords.some(w => text.includes(name) && text.substring(text.indexOf(name), text.indexOf(name) + 30).includes(w))) {
    relationships.push('同伴/伙伴')
  }
  if (familyWords.some(w => text.includes(name) && text.substring(text.indexOf(name), text.indexOf(name) + 20).includes(w))) {
    relationships.push('亲属')
  }
  if (helpWords.some(w => text.includes(name) && text.substring(text.indexOf(name), text.indexOf(name) + 20).includes(w))) {
    relationships.push('帮助者')
  }
  if (conflictWords.some(w => text.includes(name) && text.substring(text.indexOf(name), text.indexOf(name) + 20).includes(w))) {
    relationships.push('敌对')
  }
  if (infoWords.some(w => text.includes(name) && text.substring(text.indexOf(name), text.indexOf(name) + 20).includes(w))) {
    relationships.push('信息交流')
  }
  if (emotionWords.some(w => text.includes(name) && text.substring(text.indexOf(name), text.indexOf(name) + 20).includes(w))) {
    relationships.push('情感关联')
  }

  return [...new Set(relationships)].slice(0, 5)
}

function extractCharacters(text: string): Character[] {
  const isChinese = hasChineseText(text)
  const chineseNames = isChinese ? extractChineseNames(text) : []
  const englishNames = extractEnglishNames(text)
  const allNames = [...new Set([...chineseNames, ...englishNames])]

  return allNames.slice(0, 15).map(name => ({
    name,
    role: determineRole(text, name),
    relationships: findRelationships(text, name, allNames),
  }))
}

function extractTimeline(text: string): TimelineEvent[] {
  const isChinese = hasChineseText(text)
  const events: TimelineEvent[] = []
  const sentences = text.split(/[。！？.!?\n]+/).filter(s => s.trim().length > 0)

  const allTimeMarkers = isChinese
    ? [...TIME_MARKERS_CN, ...TIME_MARKERS_EN]
    : [...TIME_MARKERS_EN, ...TIME_MARKERS_CN]

  let order = 0
  const seenEvents = new Set<string>()

  for (const sentence of sentences) {
    const trimmed = sentence.trim()
    if (trimmed.length < 2) continue

    for (const marker of allTimeMarkers) {
      if (trimmed.includes(marker)) {
        const eventKey = trimmed.substring(0, Math.min(30, trimmed.length))
        if (!seenEvents.has(eventKey)) {
          seenEvents.add(eventKey)
          const eventText = trimmed.length > 50 ? trimmed.substring(0, 50) + '…' : trimmed
          events.push({
            event: eventText,
            order: order++,
          })
        }
        break
      }
    }
  }

  if (events.length === 0 && sentences.length > 0) {
    const step = Math.max(1, Math.floor(sentences.length / 5))
    for (let i = 0; i < sentences.length; i += step) {
      const trimmed = sentences[i].trim()
      if (trimmed.length >= 2) {
        const eventText = trimmed.length > 50 ? trimmed.substring(0, 50) + '…' : trimmed
        events.push({
          event: eventText,
          order: events.length,
        })
      }
    }
  }

  return events
}

function extractPlotNodes(text: string): PlotNode[] {
  const isChinese = hasChineseText(text)
  const nodes: PlotNode[] = []
  const sentences = text.split(/[。！？.!?\n]+/).filter(s => s.trim().length > 0)

  const dramaMarkers = isChinese
    ? [...DRAMA_MARKERS_CN, ...DRAMA_MARKERS_EN]
    : [...DRAMA_MARKERS_EN, ...DRAMA_MARKERS_CN]

  const emotionMarkers = isChinese
    ? [...EMOTION_PEAK_CN, ...EMOTION_PEAK_EN]
    : [...EMOTION_PEAK_EN, ...EMOTION_PEAK_CN]

  const transitionMarkers = isChinese
    ? [...TRANSITION_WORDS_CN]
    : ['however','but','yet','nevertheless','meanwhile','suddenly','therefore']

  let hasExposition = false
  let hasClimax = false
  let hasResolution = false
  let hasTurningPoint = false

  if (sentences.length > 0) {
    const firstSentence = sentences[0].trim()
    const eventText = firstSentence.length > 50 ? firstSentence.substring(0, 50) + '…' : firstSentence
    nodes.push({
      title: '故事开端',
      description: eventText,
      type: 'exposition',
    })
    hasExposition = true
  }

  for (let i = 1; i < sentences.length; i++) {
    const sentence = sentences[i].trim()
    if (sentence.length < 2) continue

    const hasDrama = dramaMarkers.some(m => sentence.includes(m))
    const hasEmotion = emotionMarkers.some(m => sentence.includes(m))
    const hasTransition = transitionMarkers.some(m => sentence.includes(m))

    const intensity = (hasDrama ? 2 : 0) + (hasEmotion ? 2 : 0) + (hasTransition ? 1 : 0)
    const position = i / sentences.length

    if (intensity >= 3) {
      if (position > 0.6 && !hasClimax) {
        const eventText = sentence.length > 50 ? sentence.substring(0, 50) + '…' : sentence
        nodes.push({
          title: isChinese ? '故事高潮' : 'Climax',
          description: eventText,
          type: 'climax',
        })
        hasClimax = true
      } else if (!hasTurningPoint) {
        const eventText = sentence.length > 50 ? sentence.substring(0, 50) + '…' : sentence
        nodes.push({
          title: isChinese ? '关键转折' : 'Turning Point',
          description: eventText,
          type: 'turning_point',
        })
        hasTurningPoint = true
      }
    } else if (intensity >= 2 && position > 0.3 && position < 0.7 && !hasTurningPoint) {
      const eventText = sentence.length > 50 ? sentence.substring(0, 50) + '…' : sentence
      nodes.push({
        title: isChinese ? '情节转折' : 'Turning Point',
        description: eventText,
        type: 'turning_point',
      })
      hasTurningPoint = true
    }
  }

  if (sentences.length > 2 && !hasClimax) {
    const midIndex = Math.floor(sentences.length * 0.65)
    const sentence = sentences[Math.min(midIndex, sentences.length - 1)].trim()
    const eventText = sentence.length > 50 ? sentence.substring(0, 50) + '…' : sentence
    nodes.push({
      title: isChinese ? '核心冲突' : 'Core Conflict',
      description: eventText,
      type: 'climax',
    })
    hasClimax = true
  }

  if (sentences.length > 3 && !hasResolution) {
    const lastSentence = sentences[sentences.length - 1].trim()
    const eventText = lastSentence.length > 50 ? lastSentence.substring(0, 50) + '…' : lastSentence
    nodes.push({
      title: isChinese ? '故事结局' : 'Resolution',
      description: eventText,
      type: 'resolution',
    })
    hasResolution = true
  }

  if (sentences.length > 5 && !hasTurningPoint) {
    const midIndex = Math.floor(sentences.length * 0.4)
    const sentence = sentences[midIndex].trim()
    const eventText = sentence.length > 50 ? sentence.substring(0, 50) + '…' : sentence
    nodes.push({
      title: isChinese ? '情节转折' : 'Turning Point',
      description: eventText,
      type: 'turning_point',
    })
  }

  const typeOrder: Record<string, number> = { exposition: 0, turning_point: 1, climax: 2, resolution: 3 }
  nodes.sort((a, b) => typeOrder[a.type] - typeOrder[b.type])

  return nodes
}

function detectGaps(text: string, characters: Character[], timeline: TimelineEvent[]): Gap[] {
  const gaps: Gap[] = []
  const isChinese = hasChineseText(text)
  const sentences = text.split(/[。！？.!?\n]+/).filter(s => s.trim().length > 0)

  const nameSet = new Set(characters.map(c => c.name))
  const introducedNames = new Set<string>()
  let characterGapCount = 0

  for (let i = 0; i < sentences.length && characterGapCount < 2; i++) {
    const sentence = sentences[i].trim()
    for (const name of nameSet) {
      if (sentence.includes(name) && !introducedNames.has(name)) {
        const isFirstMention = i > 3
        if (isFirstMention) {
          const prevSentences = sentences.slice(0, i).join('')
          const hasIntro = /(?:名叫|叫做|就是|正是|原来|一位|一个|名叫|这就是|这位|那位|有一个|有位)/.test(prevSentences) ||
            prevSentences.includes(name)

          if (!hasIntro && characterGapCount < 2) {
            const context = sentence.length > 30 ? sentence.substring(0, 30) + '…' : sentence
            gaps.push({
              position: isChinese ? `第${i + 1}句: "${context}"` : `Sentence ${i + 1}: "${context}"`,
              type: 'logic_gap',
              description: isChinese
                ? `角色"${name}"突然出现，此前没有充分的介绍`
                : `Character "${name}" appears suddenly without proper introduction`,
              suggestion: isChinese
                ? `建议在前面添加对"${name}"的介绍或铺垫`
                : `Consider introducing "${name}" earlier in the narrative`,
            })
            characterGapCount++
          }
        }
        introducedNames.add(name)
      }
    }
  }

  if (timeline.length >= 2) {
    let timeJumpCount = 0
    for (let i = 1; i < timeline.length && timeJumpCount < 2; i++) {
      const prev = timeline[i - 1]
      const curr = timeline[i]

      const bigJumpPatterns = /(?:年后|个月后|周后|数年|多年|很久)/
      if (bigJumpPatterns.test(curr.event) || bigJumpPatterns.test(prev.event)) {
        const gapDesc = isChinese
          ? `时间线上存在较大跳跃，从"${prev.event.substring(0, 20)}"到"${curr.event.substring(0, 20)}"缺少过渡`
          : `Large time jump from "${prev.event.substring(0, 20)}" to "${curr.event.substring(0, 20)}" lacks transition`
        gaps.push({
          position: isChinese ? `时间线位置 ${prev.order} → ${curr.order}` : `Timeline position ${prev.order} → ${curr.order}`,
          type: 'missing_plot',
          description: gapDesc,
          suggestion: isChinese
            ? '建议添加过渡段落，说明时间跨度内发生的重要事件'
            : 'Consider adding transition paragraphs explaining key events during the time span',
        })
        timeJumpCount++
      }
    }
  }

  const paragraphBreaks = text.split(/\n\s*\n/)
  if (paragraphBreaks.length > 1) {
    let transitionGapCount = 0
    for (let i = 1; i < paragraphBreaks.length && transitionGapCount < 2; i++) {
      const prevPara = paragraphBreaks[i - 1].trim()
      const currPara = paragraphBreaks[i].trim()

      if (prevPara.length > 10 && currPara.length > 10) {
        const hasAnyTransition = TRANSITION_WORDS_CN.some(w => currPara.startsWith(w)) ||
          /^(?:However|But|Meanwhile|Later|Then|After|Next|Suddenly|When)/i.test(currPara)

        const lastChar = prevPara[prevPara.length - 1]
        const endsAbruptly = !/[。！？.!?]/.test(lastChar)

        if (!hasAnyTransition || endsAbruptly) {
          const context = currPara.substring(0, Math.min(30, currPara.length))
          gaps.push({
            position: isChinese ? `段落${i}开头: "${context}…"` : `Paragraph ${i} start: "${context}…"`,
            type: 'missing_plot',
            description: isChinese
              ? '段落之间的场景转换不够自然，缺少过渡'
              : 'Scene transition between paragraphs feels abrupt',
            suggestion: isChinese
              ? '建议添加过渡语句，使场景转换更加流畅'
              : 'Consider adding transitional phrases for smoother scene changes',
          })
          transitionGapCount++
        }
      }
    }
  }

  const characterNames = characters.map(c => c.name)
  const firstHalfNames = new Set<string>()
  const secondHalfNames = new Set<string>()
  const midPoint = Math.floor(sentences.length / 2)

  for (let i = 0; i < sentences.length; i++) {
    for (const name of characterNames) {
      if (sentences[i].includes(name)) {
        if (i < midPoint) firstHalfNames.add(name)
        else secondHalfNames.add(name)
      }
    }
  }

  let disappearedCount = 0
  for (const name of firstHalfNames) {
    if (!secondHalfNames.has(name) && disappearedCount < 2) {
      const char = characters.find(c => c.name === name)
      if (char && (char.role === '主角' || char.role === '重要配角')) {
        gaps.push({
          position: isChinese ? `故事后半部分` : 'Second half of the story',
          type: 'logic_gap',
          description: isChinese
            ? `角色"${name}"在前半部分出现，但后半部分消失，线索未得到收束`
            : `Character "${name}" appears in the first half but disappears in the second half without resolution`,
          suggestion: isChinese
            ? `建议在结尾处交代"${name}"的结局，或在前文做好铺垫`
            : `Consider resolving "${name}"'s storyline or providing closure`,
        })
        disappearedCount++
      }
    }
  }

  return gaps.slice(0, 10)
}

function calculateScore(
  text: string,
  characters: Character[],
  timeline: TimelineEvent[],
  plotNodes: PlotNode[],
  gaps: Gap[],
): Score {
  const charCount = text.length
  const sentenceCount = text.split(/[。！？.!?\n]+/).filter(s => s.trim().length > 0).length

  let characterDepth = 0
  if (characters.length === 0) {
    characterDepth = 20
  } else {
    const avgRelationships = characters.reduce((sum, c) => sum + c.relationships.length, 0) / characters.length
    const protagonistCount = characters.filter(c => c.role === '主角').length
    const hasProtagonist = protagonistCount > 0
    const hasAntagonist = characters.some(c => c.role === '反派')

    characterDepth = Math.min(100, Math.round(
      30 +
      (hasProtagonist ? 15 : 0) +
      (hasAntagonist ? 10 : 0) +
      Math.min(20, characters.length * 5) +
      Math.min(25, avgRelationships * 10)
    ))
  }

  const nodeTypes = new Set(plotNodes.map(n => n.type))
  let plotCoherence = 0
  if (plotNodes.length === 0) {
    plotCoherence = 15
  } else {
    plotCoherence = Math.min(100, Math.round(
      20 +
      (nodeTypes.has('exposition') ? 20 : 0) +
      (nodeTypes.has('climax') ? 25 : 0) +
      (nodeTypes.has('turning_point') ? 15 : 0) +
      (nodeTypes.has('resolution') ? 20 : 0) +
      (plotNodes.length >= 3 ? 10 : plotNodes.length * 3)
    ))
  }

  let timelineCompleteness = 0
  if (timeline.length === 0) {
    timelineCompleteness = 10
  } else if (sentenceCount <= 3) {
    timelineCompleteness = 50
  } else {
    const timeRatio = Math.min(1, timeline.length / Math.max(1, sentenceCount * 0.3))
    timelineCompleteness = Math.min(100, Math.round(
      30 +
      timeRatio * 40 +
      Math.min(30, timeline.length * 8)
    ))
  }

  let logicalConsistency = 0
  if (gaps.length === 0) {
    logicalConsistency = 95
  } else if (gaps.length <= 2) {
    logicalConsistency = Math.round(85 - gaps.length * 10)
  } else if (gaps.length <= 5) {
    logicalConsistency = Math.round(70 - (gaps.length - 2) * 8)
  } else {
    logicalConsistency = Math.max(15, Math.round(46 - (gaps.length - 5) * 5))
  }

  const logicGaps = gaps.filter(g => g.type === 'logic_gap').length
  logicalConsistency = Math.max(10, logicalConsistency - logicGaps * 3)

  const overall = Math.round(
    characterDepth * 0.25 +
    plotCoherence * 0.3 +
    timelineCompleteness * 0.2 +
    logicalConsistency * 0.25
  )

  return {
    overall: Math.max(10, Math.min(98, overall)),
    characterDepth: Math.max(10, Math.min(98, characterDepth)),
    plotCoherence: Math.max(10, Math.min(98, plotCoherence)),
    timelineCompleteness: Math.max(10, Math.min(98, timelineCompleteness)),
    logicalConsistency: Math.max(10, Math.min(98, logicalConsistency)),
  }
}

export function analyzeText(text: string): AnalyzeResult {
  const characters = extractCharacters(text)
  const timeline = extractTimeline(text)
  const plotNodes = extractPlotNodes(text)
  const gaps = detectGaps(text, characters, timeline)
  const score = calculateScore(text, characters, timeline, plotNodes, gaps)

  return { characters, timeline, plotNodes, gaps, score }
}

function splitIntoSentences(text: string): string[] {
  return text.split(/([。！？.!?\n]+)/).reduce((acc: string[], part, idx, arr) => {
    if (idx % 2 === 0 && part.trim()) {
      const next = arr[idx + 1] || ''
      acc.push(part + next)
    }
    return acc
  }, []).filter(s => s.trim().length > 0)
}

function optimizeForChildren(text: string): OptimizeSuggestion[] {
  const suggestions: OptimizeSuggestion[] = []
  const sentences = splitIntoSentences(text)

  const longSentenceRegex = /[^。！？.!?\n]{40,}/g
  let match: RegExpExecArray | null
  while ((match = longSentenceRegex.exec(text)) !== null) {
    const original = match[0]
    const mid = Math.floor(original.length / 2)
    const splitPoint = original.lastIndexOf('，', mid) || original.lastIndexOf(',', mid)
    if (splitPoint > 10) {
      suggestions.push({
        original: original.substring(0, Math.min(40, original.length)) + (original.length > 40 ? '…' : ''),
        optimized: original.substring(0, splitPoint + 1) + '\n' + original.substring(splitPoint + 1),
        reason: '长句拆分：儿童更适合短小精悍的句子，便于理解和朗读',
      })
    }
    if (suggestions.length >= 2) break
  }

  const plainDescPatterns: [RegExp, string][] = [
    [/他走了/g, '他蹦蹦跳跳地走啦'],
    [/她走了/g, '她蹦蹦跳跳地走啦'],
    [/他跑了/g, '他嗖地一下跑掉了'],
    [/她跑了/g, '她嗖地一下跑掉了'],
    [/天亮了/g, '天慢慢亮起来了，太阳公公露出了笑脸'],
    [/天黑了/g, '天渐渐黑下来了，月亮姐姐升上了天空'],
    [/下雨了/g, '哗啦啦，小雨点从天上跳了下来'],
    [/刮风了/g, '呼呼呼，风儿唱起了歌'],
    [/他哭了/g, '他的眼泪像断了线的珠子一样掉下来'],
    [/她哭了/g, '她的眼泪像断了线的珠子一样掉下来'],
    [/他笑了/g, '他的脸上绽开了像花儿一样的笑容'],
    [/她笑了/g, '她的脸上绽开了像花儿一样的笑容'],
  ]

  for (const [pattern, optimized] of plainDescPatterns) {
    if (pattern.test(text)) {
      const original = pattern.source.replace(/\\/g, '').replace(/\[.*?\]/g, '')
      const firstMatch = text.match(pattern)
      if (firstMatch) {
        suggestions.push({
          original: firstMatch[0],
          optimized,
          reason: '增加生动描写：用拟人和比喻让文字更有趣，更吸引小朋友',
        })
      }
      if (suggestions.length >= 4) break
    }
  }

  const onomatopoeiaMap: [string, string, string][] = [
    ['门开了', '门"吱呀"一声开了', '添加拟声词，让场景更生动'],
    ['水声', '"哗啦啦"的水声', '添加拟声词，增强听觉感受'],
    ['鸟叫', '"叽叽喳喳"的鸟叫声', '添加拟声词，增添趣味'],
    ['走路', '"嗒嗒嗒"的脚步声', '添加拟声词，增强画面感'],
    ['敲门', '"咚咚咚"的敲门声', '添加拟声词，让场景更有活力'],
  ]

  for (const [keyword, optimized, reason] of onomatopoeiaMap) {
    if (text.includes(keyword)) {
      suggestions.push({
        original: keyword,
        optimized,
        reason,
      })
      if (suggestions.length >= 5) break
    }
  }

  const abstractWords: [RegExp, string, string][] = [
    [/非常高兴/g, '开心得像只快乐的小鸟', '用具体比喻替代抽象形容词'],
    [/非常难过/g, '难过极了，心像被小石头压着', '用具体比喻替代抽象形容词'],
    [/非常害怕/g, '害怕得缩成了一团', '用具体动作替代抽象形容词'],
    [/非常生气/g, '气得直跺脚', '用具体动作替代抽象形容词'],
    [/很美丽/g, '美得像画一样', '用比喻让描写更具体'],
    [/很勇敢/g, '像小狮子一样勇敢', '用比喻让孩子更容易理解'],
  ]

  for (const [pattern, optimized, reason] of abstractWords) {
    if (pattern.test(text)) {
      const firstMatch = text.match(pattern)
      if (firstMatch) {
        suggestions.push({
          original: firstMatch[0],
          optimized,
          reason,
        })
      }
      if (suggestions.length >= 6) break
    }
  }

  return suggestions.slice(0, 6)
}

function optimizeForLiterary(text: string): OptimizeSuggestion[] {
  const suggestions: OptimizeSuggestion[] = []
  const sentences = splitIntoSentences(text)

  const plainDescPatterns: [RegExp, string, string][] = [
    [/太阳升起来了/g, '朝阳从地平线缓缓升起，金色的光芒穿透薄雾，为大地镀上一层温暖的辉光', '增加意象和氛围描写'],
    [/月亮出来了/g, '月华如练，悄然流泻过树梢，将银辉洒落在寂静的大地上', '使用典雅的意象和修辞'],
    [/天下雨了/g, '细雨如丝，悄然织就了一幅朦胧的水墨画，雨滴轻叩窗棂，似在低诉着什么', '增加意象，营造诗意氛围'],
    [/花开了/g, '花蕾在晨露中悄然绽放，如同一个被小心翼翼打开的秘密，吐露着馥郁的芬芳', '使用拟人和比喻增强文学性'],
    [/风吹过/g, '风轻轻拂过，带着远方的故事和季节的低语，掠过每一片颤动的叶尖', '赋予风以叙事感和诗意'],
    [/他走了/g, '他的身影渐渐融入暮色，像一滴墨溶入了无边的夜', '使用意象和比喻提升画面感'],
    [/她笑了/g, '她的笑意如涟漪般在眉眼间荡漾开来，温柔了整个季节', '用细腻的意象传达情感'],
    [/他哭了/g, '泪水无声地滑落，像是心底某个角落悄然碎裂的声音', '用通感和意象深化情感表达'],
    [/天黑了/g, '夜幕如潮水般漫涌而来，将最后一缕暮光温柔地吞没', '使用比喻营造氛围'],
    [/很安静/g, '寂静如一匹锦缎，光滑而深沉，连呼吸都显得过于喧嚣', '用比喻和对比增强文学表达'],
  ]

  for (const [pattern, optimized, reason] of plainDescPatterns) {
    if (pattern.test(text)) {
      const firstMatch = text.match(pattern)
      if (firstMatch) {
        suggestions.push({
          original: firstMatch[0],
          optimized,
          reason,
        })
      }
      if (suggestions.length >= 3) break
    }
  }

  const simpleVerbs: [RegExp, string, string][] = [
    [/看(着|了|到)/g, '凝视$1', '使用更精确的动词'],
    [/说(着|了|道)/g, '轻叹$1', '根据语境选择更有表现力的动词'],
    [/想(着|了|到)/g, '思忖$1', '使用更典雅的用词'],
    [/走(着|了|过)/g, '踱$1', '用更具画面感的动词'],
    [/拿(着|了|起)/g, '执$1', '使用更文雅的用词'],
  ]

  for (const [pattern, optimized, reason] of simpleVerbs) {
    if (pattern.test(text)) {
      const firstMatch = text.match(pattern)
      if (firstMatch) {
        suggestions.push({
          original: firstMatch[0],
          optimized: firstMatch[0].replace(pattern, optimized),
          reason,
        })
      }
      if (suggestions.length >= 5) break
    }
  }

  const emotionPatterns: [RegExp, string, string][] = [
    [/很伤心/g, '心中涌起一阵难以名状的酸楚，仿佛有什么正在被无声地剥落', '将直白情感转化为意象化表达'],
    [/很高兴/g, '一种温润的喜悦从心底升起，如同春日第一朵绽放的花', '用意象承载情感'],
    [/很害怕/g, '恐惧如暗流般悄然漫上心头，将勇气一寸寸侵蚀', '用比喻深化恐惧的层次感'],
    [/很生气/g, '怒意如暗火般在胸腔中燃烧，灼烧着每一根紧绷的神经', '用意象表达愤怒的力量'],
    [/很感动/g, '一种温暖的震颤从心底蔓延开来，如同被时光轻轻拥抱', '用细腻的感官描写传递感动'],
  ]

  for (const [pattern, optimized, reason] of emotionPatterns) {
    if (pattern.test(text)) {
      suggestions.push({
        original: text.match(pattern)![0],
        optimized,
        reason,
      })
      if (suggestions.length >= 6) break
    }
  }

  const atmospherePatterns: [RegExp, string, string][] = [
    [/房间里/g, '昏暗的房间里，烛火摇曳，光影在墙壁上跳着无声的舞蹈。房间里', '添加环境氛围描写'],
    [/街道上/g, '青石铺就的街道上，雨后的水洼映着天光。街道上', '添加场景氛围渲染'],
    [/森林里/g, '幽深的森林里，斑驳的光影在苔藓上织出迷离的图案。森林里', '增加环境意象'],
  ]

  for (const [pattern, optimized, reason] of atmospherePatterns) {
    if (pattern.test(text)) {
      const firstMatch = text.match(pattern)
      if (firstMatch) {
        suggestions.push({
          original: firstMatch[0],
          optimized,
          reason,
        })
      }
      if (suggestions.length >= 7) break
    }
  }

  return suggestions.slice(0, 7)
}

export function optimizeText(
  text: string,
  style: 'children' | 'literary',
  gaps?: Gap[],
): OptimizeResult {
  let suggestions: OptimizeSuggestion[]

  if (style === 'children') {
    suggestions = optimizeForChildren(text)
  } else {
    suggestions = optimizeForLiterary(text)
  }

  if (gaps && gaps.length > 0) {
    for (const gap of gaps.slice(0, 2)) {
      if (gap.type === 'missing_plot') {
        const transitionSuggestion = style === 'children'
          ? `就这样，时间一天天过去了…`
          : `时光如流水般悄然滑过，带走了那段日子里的喧嚣与沉默。`
        suggestions.push({
          original: gap.position,
          optimized: transitionSuggestion,
          reason: style === 'children'
            ? `根据分析缺口，建议在此处添加过渡语句，让故事更连贯`
            : `根据分析缺口，建议在此处添加过渡描写，增添叙事的流动性`,
        })
      } else if (gap.type === 'logic_gap') {
        const logicFix = style === 'children'
          ? `从前，有一个叫___的人…`
          : `那个被提及的名字，其实早已在命运的经纬中埋下了伏笔。`
        suggestions.push({
          original: gap.position,
          optimized: logicFix,
          reason: style === 'children'
            ? `根据逻辑缺口，建议为角色添加适当的介绍`
            : `根据逻辑缺口，建议为角色的出现添加伏笔或铺垫`,
        })
      }
    }
  }

  return {
    style,
    suggestions: suggestions.slice(0, 8),
  }
}
