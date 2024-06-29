//部分数值不在游戏中使用


const TBDGPA = 999;   //每到新学期，将总成绩单里的当前学期绩点改为--
//绩点相关数据
const A = 0;
const ALLimit = 90;
const Aminus = 1;
const AminusLLimit = 85;
const Bplus = 2;
const BplusLLimit = 82;
const B = 3;
const BLLimit = 78;
const Bminus = 4;
const BminusLLimit = 75;
const Cplus = 5;
const CplusLLimit = 71;
const C = 6;
const CLLimit = 66;
const Cminus = 7;
const CminusLLimit = 62;
const D = 8;
const DLLimit = 60;
const Dminus = 9;
const F = 10;
const gradeNumber = 11;
//从A到F，共11个成绩等级

//专业相关

//人文大类
const ART_MAJOR = 11;   
const ART_NUM = 6;
const ART_DIFF = 10;  //难度系数
//难度系数越大，期末考越简单。难度系数可以取正值，也可以取负值。
const artMajorCode = 11; 
const artMajorText = "人文类专业";
const artMajorCourseNum = 6;  //每学期上六门课
const artTotalCourseNum = 46;  //大二、大三，每学期多一门课。即 6x8+4=52 
//大四下学期写毕业论文，没课。再减掉6是46。
//社科大类
const SOCIAL_MAJOR = 22;
const SOCIAL_NUM = 7;
const SOCIAL_DIFF = 5;
const socialMajorCode = 22; 
const socialMajorText = "经管法等社科专业";
const socialMajorCourseNum = 7;
const socialTotalCourseNum = 53;
//工科大类
const ENGINEER_MAJOR = 33;
const ENGINEER_NUM = 7;
const ENGINEER_DIFF = 0;
const engineerMajorCode = 33; 
const engineerMajorText = "新工科类专业";
const engineerMajorCourseNum = 7;
const engineerTotalCourseNum = 53;
//理科大类
const SCIENCE_MAJOR = 44;
const SCIENCE_NUM = 5;
const SCIENCE_DIFF = -10;
const scienceMajorCode = 44; 
const scienceMajorText = "基础科学";
const scienceMajorCourseNum = 5;
const scienceTotalCourseNum = 39;

//不同等级的学期规划限制
const MONEY_M_LIMIT = 1000;
const MONEY_H_LIMIT = 2000;
const MONEY_EX_LIMIT = 10000;
const HORIZON_M_LIMIT = 6;
const HORIZON_H_LIMIT = 13;
const HORIZON_EX_LIMIT = 24;

//特殊事件代码。不同事件的代码应区分开。
//一部分代码不以CODE开头，但也是事件代码。彼此取值不能重复。
const CODE_PIN_KUN = 1234;
const CODE_XUE_SHENG_HUI = 2345;
const CODE_GU_GU = 3456;
const CODE_NOBEL = 4567;
const CODE_GUOJIANG = 5678;
const CODE_LIZHI = 5578;
const CODE_GONGZUO = 2222;
const BAOYAN_GOOD = 6789;
const BAOYAN_BAD = 9876;
const TIAOJI_GOOD = 3344;
const TIAOJI_BAD = 4433;
const CODE_XSH1 = 23451;
const CODE_XSH2 = 23452;
const CODE_XSH3 = 23453;
const CODE_GGZ1 = 34567;
const CODE_GGZ2 = 34568;
const CODE_GGZ3 = 34569;
const CODE_NOBEL1 = 45671;
const CODE_NOBEL2 = 45672;
const CODE_NOBEL3 = 45673;

//一些事件的绩点、战力、智力限制
const GUOJIANG_LIMIT = 370; //拿国奖的gpa下限
const LIZHI_LIMIT = 330;    //拿励志的gpa下限
const XUEYE_LIMIT = 300;    //学业奖学金gpa下限
const P1_BATTLE_LIMIT = 10; //第一阶段事件 战力要求
const P2_BATTLE_LIMIT = 16; 
const P3_BATTLE_LIMIT = 24;
const P1_IQ_LIMIT = 15;
const P2_IQ_LIMIT = 12;
const P3_IQ_LIMIT = 9;



//通关特典
const giftnone = "占位符";
const giftLowrank = "提升通关评价，解锁更多特典";
const giftemptystr = "";
//E评价
const GIFT_E_RANK = 5;  
const giftAttr1 = "铁树枝干";
const giftAttr1des = "（全属性随机下限+2）";
const giftLuck1 = "幸运挂饰";
const giftLuck1des = "(幸运值+2）";
const giftBattle1 = "玩具拳套";
const giftBattle1des = "（战斗力+2）";
const ErankGiftTexts = [giftAttr1, giftLuck1, giftBattle1, giftLowrank, giftLowrank, giftLowrank, giftLowrank, giftLowrank, giftLowrank, giftLowrank];
const ErankGiftDess = [giftAttr1des, giftLuck1des, giftBattle1des, giftemptystr, giftemptystr, giftemptystr, giftemptystr, giftemptystr, giftemptystr, giftemptystr];
//D评价
const GIFT_D_RANK = 6;
const giftInt1 = "智力斗篷";
const giftInt1des = "（智力随机下限+6）";
const giftHor1 = "望远镜";
const giftHor1des = "（眼界随机下限+6）";
const giftFin1 = "资本家手杖";
const giftFin1des = "（财商随机下限+6）";
const giftWea1 = "全面脱贫";
const giftWea1des = "（家境随机下限+6）";
const DrankGiftTexts = [giftAttr1, giftLuck1, giftBattle1, giftInt1, giftHor1, giftFin1, giftWea1, giftLowrank, giftLowrank, giftLowrank];
const DrankGiftDess = [giftAttr1des, giftLuck1des, giftBattle1des, giftInt1des, giftHor1des, giftFin1des, giftWea1des, giftemptystr, giftemptystr, giftemptystr];
//C评价
const GIFT_C_RANK = 7;
const giftAttr2 = "贵族圆环";
const giftAttr2des = "（全属性随机下限+4）";
const giftLuck2 = "空灵吊坠";
const giftLuck2des = "（幸运值+5）";
const giftBattle2 = "攻击之爪";
const giftBattle2des = "（战斗力+5）";
const CrankGiftTexts = [giftAttr1, giftLuck1, giftBattle1, giftInt1, giftHor1, giftFin1, giftWea1, giftAttr2, giftLuck2, giftBattle2];
const CrankGiftDess = [giftAttr1des, giftLuck1des, giftBattle1des, giftInt1des, giftHor1des, giftFin1des, giftWea1des, giftAttr2des, giftLuck2des, giftBattle2des];
//B评价
const GIFT_B_RANK = 8;
const giftWeaex = "地主家的傻儿子";
const giftWeaexdes = "（家境拉满、战斗力+5，智力随机上限-8）";
const giftMoney = "暴发户";
const giftMoneydes = "（家境贫困，但开局金钱+25000）";
const giftExam = "卷王";
const giftExamdes = "（大幅提升期末考试成绩）";
const BrankGiftTexts = [giftInt1, giftHor1, giftFin1, giftWea1, giftAttr2, giftLuck2, giftBattle2, giftWeaex, giftMoney, giftExam];
const BrankGiftDess = [giftInt1des, giftHor1des, giftFin1des, giftWea1des, giftAttr2des, giftLuck2des, giftBattle2des, giftWeaexdes, giftMoneydes, giftExamdes];
//A评价
const GIFT_A_RANK = 9;
const giftAttr3 = "国王头冠";
const giftAttr3des = "（全属性随机下限+6）";
const ArankGiftTexts = [giftInt1, giftHor1, giftFin1, giftAttr2, giftLuck2, giftBattle2, giftWeaex, giftMoney, giftExam, giftAttr3];
const ArankGiftDess = [giftInt1des, giftHor1des, giftFin1des, giftAttr2des, giftLuck2des, giftBattle2des, giftWeaexdes, giftMoneydes, giftExamdes, giftAttr3des];
//S评价
const GIFT_S_RANK = 10;
const giftExceed = "超越极限";
const giftExceeddes = "（全属性随机上限+7）";
const giftLuck3 = "幸运女神的庇佑";
const giftLuck3des = "（幸运值+12）";
const SrankGiftTexts = [giftHor1, giftAttr2, giftLuck2, giftBattle2, giftWeaex, giftMoney, giftExam, giftAttr3, giftExceed, giftLuck3];
const SrankGiftDess = [giftHor1des, giftAttr2des, giftLuck2des, giftBattle2des, giftWeaexdes, giftMoneydes, giftExamdes, giftAttr3des, giftExceeddes, giftLuck3des];

//结局的评价等级
const S_END_RANK = 10;
const A_END_RANK = 9;
const B_END_RANK = 8;
const C_END_RANK = 7;
const D_END_RANK = 6;
const E_END_RANK = 5;

//结局代码。所有以END结尾的，数值要区分开，不能重复
const MOOD_END = 333;
const STRENGTH_END = 444;
const SPIRIT_END = 555;
const RISK_END = 666;
const GUAKE_END = 777;
const BAOYAN_END = 888;
const KAOYAN_END = 222;
const BAOYAN1_END = 8881;
const BAOYAN2_END = 8882;
const BAOYAN3_END = 8883;
const KAOYAN1_END = 2221;
const KAOYAN2_END = 2222;
const KAOYAN3_END = 2223;
const BIYE_SHIYE_END = 12; //毕业即失业，要求双证齐全且没有工作、没有学上
const GONGZUO3_END = 23;
const GONGZUO2_END = 22;
const GONGZUO1_END = 21;
const PERFECT_END = 1333; //考研3+工作3
const DANBIYE_END = 1434; //单毕业证、没工作
const JIEYE_END = 1444;  //结业
const XSH_END = 1354;
const GGZ_END = 1453;
const NOBEL_END = 4513;




//记录一些全局变量。
//这里的变量基本都用来储存单局数据，或作某些重要事件的判断。开始新一局游戏时，应重置它们的值。

//特殊事件flag
let flagPinKunBuZhu = false;  //贫困补助
let flagXueShengHui = false; //学生会
let flagGuGuZhen = false;   //氪金页游
let flagNobel = false;    //诺奖相关事件
let eventPhase = 0;     //记录各事件进展阶段

//假期事件相关
let cetBase = 0;  //通过英语四级的基数
let shixiBase = 0;  //找到实习的基数
let flagCet = false;  //标志是否通过四级
let flagShixi = false;  //标志是否有实习经历
let flagRongYu = false;  //判断是否有（校级）荣誉

//期末考试相关
let numFailedExam = 0;  //表示挂过多少科
let numCurrentFail = 0;  //这学期多少门考试没通过
let flagJuanWang = false;  //与通关特典有关
let totalGPAArray = [];  //数组，用于储存考试成绩。元素是0-400的绩点，不是百分制成绩。

//常规流程控制
let specialDone = false;  //用于判断当前学期，是否已发生特殊事件
let jobpageDone = false; //用于表示第四年的求职计划页是否已显示
let flagQiuzhi = false;  //判断玩家是否投简历出去
let globalVocDivPointer = null;  //用来传参的一个全局指针，没实际含义
let flagGradeWarning = false;  //判断是否触发过学业警告，目前还没用到

//考研、毕业论文通过率计算
let kaoyanBase = 0;  //考研分基数
let lunwenBase = 0;   //毕业论文基数
let flagBaoyan3 = false; //名校保研
let flagBaoyan2 = false;  //一般学校保研
let flagBaoyan1 = false;  //辣鸡学校保研
let flagKaoYan3 = false; //名校考研
let flagKaoYan2 = false; //一般校考研
let flagKaoYan1 = false;  //一志愿考研失败

//结局相关flag
let flagBaoyanEnd = false;
let flagKaoshangYan = false;  //考上研
let flagGongzuo3 = false;  //好工作
let flagGongzuo2 = false; //一般的工作
let flagGongzuo1 = false; //烂工作
let flagXuewei = false;  //毕业证+学位证
let flagDanbiye = false;  //单毕业证
let flagJieye = false;  //结业
let isEnd = false;  //非正常死亡




//历史最佳记录
//!!!!跨局保存，开始新游戏时不置零。
let bestRecord = 0;  
