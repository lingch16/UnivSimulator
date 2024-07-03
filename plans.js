//学期规划、特殊事件

//学期规划
class schoolPlan{
    constructor (text, description, moneyCost, moodCost, strengthCost, spiritCost, intelligenceBonus, horizonBonus, financeBonus, examBase, battle, risk, luck) {
        this.text = text;
        this.description = description;
        this.moneyCost = moneyCost;
        this.moodCost = moodCost;
        this.strengthCost = strengthCost;
        this.spiritCost = spiritCost;
        this.intelligenceBonus = intelligenceBonus;
        this.horizonBonus = horizonBonus;
        this.financeBonus = financeBonus;
        this.examBase = examBase;
        this.battle = battle;
        this.risk = risk;
        this.luck = luck;
    }

    //根据具体事件，消耗或恢复体力、心情、体力等
    //统一用加法。消耗体力的事件，事件中strength用负数表示。
    updateAttr (player) {
        player.mood += this.moodCost;
        player.spirit += this.spiritCost;
        player.strength += this.strengthCost;
        player.money += this.moneyCost;
        player.intelligence += this.intelligenceBonus;
        player.horizon += this.horizonBonus;
        player.finance += this.financeBonus;
        player.examBase += this.examBase;
        player.battle += this.battle;
        player.risk += this.risk;
        player.luck += this.luck;
        //体力、精力、心情上限100
        if (player.mood >= 100) {
            player.mood = 100;
        }
        if (player.spirit >= 100) {
            player.spirit = 100;
        }
        if (player.strength >= 100) {
            player.strength = 100;
        }
        //风险不能降到0以下
        if(player.risk <= 0) {
            player.risk = 0;
        }
        //幸运值最高20
        if (player.luck >= 20) {
            player.luck = 20;
        }
        //更新状态栏的各项数值
        statusBanner.updateDiv(player);

        //在这里加入考研、找工作、写毕业论文相关判定。
        if (this.text === splanQiuZhao.text) {
            flagQiuzhi = true;
            let x = seekJob(player, 10);
            if (x === 3) {
                flagGongzuo3 = true;
            } else if (x === 2) {
                flagGongzuo2 = true;
            } else if (x === 1) {
                flagGongzuo1 = true;
            }
        }
        if (this.text === splanChunZhao.text) {
            flagQiuzhi = true;
            let x = seekJob(player, 5);
            if (x === 3) {
                flagGongzuo3 = true;
            } else if (x === 2) {
                flagGongzuo2 = true;
            } else if (x === 1) {
                flagGongzuo1 = true;
            }
        }
        if (this.text === splanKaoYan.text) {
            kaoyanBase += 30;
        }
        if (this.text === splanGuanXi.text) {
            kaoyanBase += 100;
        }
        if (this.text === splanLunWen.text) {
            lunwenBase += 10;
        }
        if (this.text === splanMaiLunWen.text) {
            lunwenBase += 50;
        }
    }
};

//根据眼界值不同，显示不同规划

//1决断 约等于 25状态
const splanFaDai = new schoolPlan("发呆", "小幅恢复心情、精力，较大幅恢复体力。", 0, GRI(4,6), GRI(12,17), GRI(4,6), 0, 0, 0, 0, 0, 0, 0); 
const splanJuanJiDian = new schoolPlan("卷绩点", "消耗心情、精力，小幅消耗体力。提高期末考试成绩（仅限本学期）。", 0, -GRI(8,12), -GRI(4,6), -GRI(8,12), 0, 0, 0, GRI(8,12), 0, 0, 0);
const splanDaGong = new schoolPlan("兼职打工", "小幅消耗心情、精力，较大幅度消耗体力。赚取2k左右的零花钱。", GRI(1500,2500), -GRI(4,6), -GRI(12,17), -GRI(4,6), 0, 0, 0, 0, 0, 0, 0);
const splanLiCai = new schoolPlan("闲钱理财", "消耗心情、精力，小幅消耗体力。小幅提升财商。", GRI(0,100), -GRI(8,12), -GRI(4,6), -GRI(8,12), 0, 0, GRI(1,2), 0, 0, 0, 0);
const splanDuiXian = new schoolPlan("和网友对线", "小幅消耗心情、精力，小幅提升战斗力。", 0, -GRI(4,6), 0, -GRI(4,6), 0, 0, 0, 0, GRI(1,2), GRI(1,2), 0);
const lowSplanList = [splanFaDai, splanJuanJiDian, splanDaGong, splanLiCai, splanDuiXian];

//1决断 约等于 40状态
const splanLvYou = new schoolPlan("旅游", "花千把块钱。小幅消耗体力，恢复心情、精力。小幅提升眼界。", -GRI(800,1200), GRI(8,12), -GRI(4,6), GRI(8,12), 0, GRI(1,2), 0, 0, 0, 0, 0);
const splanBaoBan = new schoolPlan("报培训班", "花千把块钱。小幅消耗心情、精力，小幅提升智力。", -GRI(800,1200), -GRI(4,6), 0, -GRI(4,6), GRI(1,2), 0, 0, 0, 0, 0, 0);
const splanXunXin = new schoolPlan("寻衅滋事", "花千把块钱。小幅消耗体力、精力，提高战斗力。", -GRI(800,1200), 0, -GRI(4,6), -GRI(4,6), 0, 0, 0, 0, GRI(1,3), GRI(1,3), 0);
const splanMaiDaAn = new schoolPlan("买答案", "花千把块钱找任课老师买答案，大幅提高期末考试成绩。", -GRI(800,1200), 0, 0, 0, 0, 0, 0, GRI(18,22), 0, GRI(2,4), 0);
const splanZiMeiTi = new schoolPlan("做自媒体", "消耗心情、精力，可能赚可能亏。", GRI(-1000,3000), -GRI(6,10), 0, -GRI(6,10), 0, 0, 0, 0, 0, 0, 0);
const middleSplanList = [splanLvYou, splanBaoBan, splanXunXin, splanMaiDaAn, splanZiMeiTi];

//1决断 约等于 100状态
const splanTangPing = new schoolPlan("躺平", "啥都不干，较大幅度恢复心情、精力、体力。也许会有好事发生。", 0, GRI(12,17), GRI(12,17), GRI(12,17), 0, 0, 0, 0, 0, -GRI(1,2), GRI(1,2));
const splanHeiKe = new schoolPlan("威胁学霸做替考", "极大幅提高期末考试成绩。", 0, 0, 0, 0, 0, 0, 0, GRI(25,35), 0, GRI(3,5), 0);
const splanChaoGu = new schoolPlan("炒股", "大概率亏很多，较大幅度提升财商。", GRI(-3600,400), 0, 0, 0, 0, 0, GRI(2,4), 0, 0, 0, 0);
const splanLianAi = new schoolPlan("谈恋爱", "花了不少钱，大幅消耗体力，恢复心情、精力。较大幅度提升眼界。", -GRI(1500,2500), GRI(8,12),  -GRI(17,23), GRI(8,12), 0, GRI(2,4), 0, 0, 0, 0, 0);
const splanGanRao = new schoolPlan("不让室友学习", "消耗体力，提高自己的期末成绩，较大幅度提高战斗力。但是会变笨。", 0, 0, -GRI(8,12), 0, -GRI(1,2), 0, 0, GRI(8,12), GRI(2,4), GRI(2,4), 0);
const highSplanList = [splanTangPing, splanHeiKe, splanChaoGu, splanLianAi, splanGanRao];

//1决断 约等于 400状态
const splanGeJiuCai = new schoolPlan("操纵金融市场", "割散户韭菜，一次就能赚一万左右，极大幅提高财商和战斗力。但可能会发生不好的事。", GRI(8000,12000), 0, 0, 0, 0, 0, GRI(4,6), 0, GRI(4,6), GRI(18,22), 0);
const splanTiKao = new schoolPlan("黑进教务系统", "期末成绩拉满，顺便勒索学校两千块钱，极大幅提高战斗力。但说不定会遭报应。", 2000, 0, 0, 0, 0, 0, 0, 100, GRI(4,6), GRI(18,22), 0);
const splanChanHui = new schoolPlan("忏悔", "向地球OL管理员坦白罪过，祈求宽恕。捐出五千块钱，大幅消耗体力、精力、心情。", -5000,  -GRI(17,23),  -GRI(17,23),  -GRI(17,23), 0, 0, 0, 0, 0, -GRI(23,25), GRI(5,7));
const splanKeYan = new schoolPlan("做科研", "消耗体力、精力、心情，极大幅度增加智力，还能拿一两千的补助。", GRI(1800,2200), -GRI(8,12), -GRI(8,12), -GRI(8,12), GRI(4,6), 0, 0, 0, 0, 0, 0);
const splanJiuYe = new schoolPlan("做市场调研", "消耗体力，极大幅度增加求职成功率，还能提高财商。", 0, 0, -GRI(8,12), 0, 0, GRI(4,6), GRI(1,3), 0, 0, 0, GRI(1,2));  //眼界与求职成功率正相关
const splanDuJia = new schoolPlan("去豪华酒店度假", "花一万块钱，体力、精力、心情全部恢复到满状态。较大幅度增加幸运值。", -10000, 200, 200, 200, 0, 0, 0, 0, 0, 0, GRI(4,6));
const exSplanList = [splanGeJiuCai, splanTiKao, splanChanHui, splanKeYan, splanJiuYe, splanDuJia];

//零体力、零金钱时，返回特殊规划
const splanBanZhuan = new schoolPlan("搬砖", "搭进去半条命，挣几千块钱。", GRI(3000,5000), -GRI(35,45), -GRI(35,45), -GRI(35,45), 0, 0, 0, 0, 0, 0, 0);
const zeroStrengthPlans = lowSplanList;
const zeroMoneyPlans = [splanBanZhuan, splanLvYou, splanBaoBan, splanChaoGu, splanLianAi];

//大四学年涉及考研、就业、写毕业论文等，适用特殊的一组规划
const splanJYFudao = new schoolPlan("听就业辅导讲座", "花五千块钱，听职场前辈传授人生经验。或许比自己闷头投简历强。（较大幅度增加求职成功率。）", -5000, 0, 0, 0, 0, GRI(2,4), 0, 0, 0, 0, 0);    //求职成功率与眼界正相关
const splanXiuZheng = new schoolPlan("休整", "花点小钱，吃好喝好休息好。（花个一两千，大幅恢复体力、精力、心情。）", -GRI(1500,2500), GRI(17,23), GRI(17,23), GRI(17,23), 0, 0, 0, 0, 0, 0, 0);
const splanQiuZhao = new schoolPlan("秋招投简历", "一口气投十份简历出去，总能拿到offer吧？（投出十份简历，大幅消耗精力。）", 0, 0, 0,  -GRI(17,23), 0, 0, 0, 0, 0, 0, 0);
const splanKaoYan = new schoolPlan("复习考研", "大幅消耗体力、精力、心情，小幅提升考研成绩。", 0,  -GRI(17,23),  -GRI(17,23),  -GRI(17,23), 0, 0, 0, 0, 0, 0, 0);
const splanGuanXi = new schoolPlan("找关系，买今年的考研题", "花五千块买原题，考研稳如老狗。但只要平时认真复习，现在不找关系也能考上吧？", -5000, 0, 0, 0, 0, 0, 0, 0, 0, GRI(38,42), 0);
const splanChunZhao = new schoolPlan("春招投简历", "说不定秋招投的简历已经出结果了。但保险起见，还是接着投吧。（投出五份简历，大幅消耗精力。）", 0, 0, 0,  -GRI(17,23), 0, 0, 0, 0, 0, 0, 0);
const splanLunWen = new schoolPlan("准备毕业论文", "总得毕业吧？不然四年学白上了。（大幅消耗体力、精力、心情，提高毕业答辩通过率。）", 0,  -GRI(17,23),  -GRI(17,23),  -GRI(17,23), 0, 0, 0, 0, 0, 0, 0);
const splanMaiLunWen = new schoolPlan("买毕业论文", "只要价格合适，愿意写本科毕业论文的一抓一大把。干嘛非得自己写？（花两万块钱，大幅提高毕业答辩通过率。）", -20000, 0, 0, 0, 0, 0, 0, 0, 0, GRI(46,54), 0);
const DaSiShangSplanList = [splanQiuZhao, splanKaoYan, splanXiuZheng, splanJYFudao, splanGuanXi];  //大四上plan
//因为后续处理中，涉及钱不够禁止选择相关选项的操作。此数组各计划顺序不能调换。
const DaSiXiaSplanList = [splanChunZhao, splanLunWen, splanXiuZheng, splanJYFudao, splanMaiLunWen]; //同样，这里各计划顺序不能调换。



//特殊事件


class specialEvent{
    constructor (text, description, moneyCost, moodCost, strengthCost, spiritCost, intelligenceBonus, financeBonus, battle, risk, code, examBase) {
        this.text = text;
        this.description = description;
        this.moneyCost = moneyCost;
        this.moodCost = moodCost;
        this.strengthCost = strengthCost;
        this.spiritCost = spiritCost;
        this.intelligenceBonus = intelligenceBonus;
        this.financeBonus = financeBonus;
        this.battle = battle;
        this.risk = risk;
        this.code = code; //事件识别码
        this.examBase = examBase;
    }

    //根据具体事件，消耗或恢复体力、心情、体力等
    //统一用加法。消耗体力的事件，事件中strength用负数表示。
    updateAttr (player) {
        player.mood += this.moodCost;
        player.spirit += this.spiritCost;
        player.strength += this.strengthCost;
        player.money += this.moneyCost;
        player.intelligence += this.intelligenceBonus;
        player.finance += this.financeBonus;
        player.risk += this.risk;
        player.battle += this.battle;
        player.examBase += this.examBase;

        if (player.mood >= 100) {
            player.mood = 100;
        }
        if (player.spirit >= 100) {
            player.spirit = 100;
        }
        if (player.strength >= 100) {
            player.strengh = 100;
        }
        if (player.risk <= 0) {
            player.risk = 0;
        }
        //更新状态栏的各项数值
        statusBanner.updateDiv(player);
    }
};

//贫困生相关事件
const seventPinKunRenDing = new specialEvent("家境贫寒，认定了贫困生资格", "拿到2000块钱补助。如果成绩优秀，还有机会评上励志奖学金。", 2000, 0, 0, 0, 0, 0, 0, 0, CODE_PIN_KUN, 0);
const seventPinKunBuZhu = new specialEvent("贫困补助到账", "拿到两千块钱。但是要强制参加活动，还要完善一些证明材料，稍微有一点麻烦。（小幅消耗心情、精力、体力。）", 2000, -GRI(4,6), -GRI(4,6), -GRI(4,6), 0, 0, 0, 0, 0, 0);
const seventPinKunXueYe = new specialEvent("学业奖学金", "最普罗大众的奖学金，没啥好说的。和贫困生补助加起来，能有四千块钱。", 4000, 0, 0, 0, 0, 0, 0, 0, 0, 0);
const seventLiZhi = new specialEvent("励志奖学金", "评上励志奖学金，手头宽裕不少。和贫困生补助加起来，足足七千块呢。", 7000, 0, 0, 0, 0, 0, 0, 0, CODE_LIZHI, 0);
const seventPinKunGuoJiang = new specialEvent("拿到国家奖学金", "拿到八千块钱。再加上今年两千的贫困生补助，到手一共一万块。既有面子又有里子。", 10000, 0, 0, 0, 0, 0, 0, 0, CODE_GUOJIANG, 0);

//奖学金事件
const seventXueYe = new specialEvent("学业奖学金", "只要努力学习，就能拿到的奖学金。不需要天赋。奖金只有区区两千块，还不够一个月花的。", 2000, 0, 0, 0, 0, 0, 0, 0, 0, 0);
const seventGuoJiang = new specialEvent("拿到国家奖学金", "学校没设置其它花里胡哨的荣誉，国奖到顶。它证明你学业上无敌了——顺便还给你八千块钱。", 8000, 0, 0, 0, 0, 0, 0, 0, CODE_GUOJIANG, 0);

//学生会事件
const seventXueShengHui = new specialEvent("加入了学生会", "说不定会有好事发生。有学生会经历，将来找工作也方便一些。但入会面试有些麻烦，还要做一份很正式的简历，花了不少时间。（小幅消耗心情、精力、体力。）", 0, -GRI(4,6), -GRI(4,6), -GRI(4,6), 0, 0, 0, 0, CODE_XUE_SHENG_HUI, 0);
//命名规则：route Xueshenghui (phase) 1
const rXsh1 = new specialEvent("出任校会部长","当上了办公室副主任（正部长级）。校学生会的中流砥柱。既要在一线干活，又要搞好部门内团队建设。今天请学弟学妹吃饭，花掉不少大洋。但心情变好了。", -GRI(800,1299), GRI(8,12), 0, 0, 0, 0, 0, 0, CODE_XSH1, 0);
const rXsh2 = new specialEvent("挤进校会主席团", "作为主席团成员兼任办公室主任，属于副主席级高干。每周都要开工作会议怼人。战斗力较大幅度提升了。", 0, 0, 0, 0, 0, 0, 3, 0, CODE_XSH2, 0);
const rXsh3 = new specialEvent("成为学生会长", "校会一把手，整个学校都在肩上扛着，位高权重。跳出三界外，不在五行中。直接成为人生赢家。", 0, 0, 0, 0, 0, 0, 0, 0, CODE_XSH3, 0);
const rListXsh = [rXsh1, rXsh2, rXsh3];

//课金页游事件
const seventGuGuZhen = new specialEvent("发现一款课金页游", "有什么非玩不可的理由吗？骗课不说，还越玩越气。（课了五百、小幅降低心情。）", -500, -GRI(4,6), 0, 0, 0, 0, 0, 0, CODE_GU_GU, 0);
const rGGZ1 = new specialEvent("入围排行榜", "往页游里课金，不知不觉课到全服前一百了。（刚说完又课了两千进去。）", -2000, 0, 0, 0, 0, 0, 0, 0, CODE_GGZ1, 0);
const rGGZ2 = new specialEvent("挤进全服前十", "卧槽，居然课到全服前十了。少说也砸了五千进去吧？", -5000, 0, 0, 0, 0, 0, 0, 0, CODE_GGZ2, 0);
const rGGZ3 = new specialEvent("页游登顶", "砸了两万进去，总算站上排行榜第一的位置了。大学？那是啥？有课金页游就够了。", -20000, 0, 0, 0, 0, 0, 0, 0, CODE_GGZ3, 0);
const rListGGZ = [rGGZ1, rGGZ2, rGGZ3];

//诺奖事件
const seventNobel = new specialEvent("生死看淡，不服就干", "sb网友叫嚣着公园单挑。你无所畏惧，对方反倒怂了。真爽。（恢复心情、大幅提升战斗力）", 0, GRI(8,12), 0, 0, 0, 0, GRI(2,4), GRI(3,4), CODE_NOBEL, 0);
const rNobel1 = new specialEvent("崭露头角", "你天天在网上对线，发现别人都是sb。突然，你转念一想。也许，并不是别人傻，而是你太聪明了。（增加战斗力。）", 0, 0, 0, 0, 0, 0, GRI(1,3), 0, CODE_NOBEL1, 0);
const rNobel2 = new specialEvent("证明了哥德巴赫猜想", "你苦思冥想，终于证明出哥德巴赫猜想。你找到数学系的老师，他却说你是民科。你感到很气愤。", 0, 0, 0, 0, 0, 0, 0, 0, CODE_NOBEL2, 0);
const rNobel3 = new specialEvent("获得诺贝尔奖", "经过一年努力，你又解决了许多数学难题。你的辩论技巧有所提升，用物理手段说服了数学院所有老师。数学院学术委员会研究决定，授予你诺贝尔数学奖。", 0, 0, 0, 0, 0, 0, 0, 0, CODE_NOBEL3, 0);
const rListNobel = [rNobel1, rNobel2, rNobel3];

//三条特殊路线的前置事件数组
//命名规则：special event 前置
const seQianZhi = [seventXueShengHui, seventGuGuZhen, seventNobel];



//大四相关事件。
//主要是将文字消息提示给用户，相关数据处理在别的地方进行。
const seventBaoyanGood = new specialEvent("预录取", "推免系统开放，被研究生学校的老师催着填了他们。一分耕耘一分收获，总算有学上了。", 0, 0, 0, 0, 0, 0, 0, 0, BAOYAN_GOOD, 0);
const seventBaoyanBad = new specialEvent("咕咕咕", "推免系统卡顿，研究生学校说他们没名额了。煮熟的鸭子飞了，还有这种操作？（大幅降低心情、精力。）", 0, -GRI(17,23), 0, -GRI(17,23), 0, 0, 0, 0, BAOYAN_BAD, 0);
const seventTiaojiGood = new specialEvent("调剂上岸", "调剂去了一所辣鸡大学。算了，有书念总比没有好。", 0, 0, 0, 0, 0, 0, 0, 0, TIAOJI_GOOD, 0);
const seventTiaojiBad = new specialEvent("调剂失败", "见鬼，就没一所大学要我？（心情变差了。）", 0, -GRI(25,35), 0, 0, 0, 0, 0, 0, TIAOJI_BAD, 0);
const seventGongzuo3 = new specialEvent("令人心动的offer", "名企管培生，在写字楼上班的职场精英。有望两年内晋升中层领导，五年跻身高管序列。", 0, 0, 0, 0, 0, 0, 0, 0, CODE_GONGZUO, 0);
const seventGongzuo2 = new specialEvent("差强人意的offer", "工作枯燥乏味，工资也就那样，附近房租却不低。走一步看一步吧。", 0, 0, 0, 0, 0, 0, 0, 0, CODE_GONGZUO, 0);
const seventGongzuo1 = new specialEvent("黑作坊offer", "郊区黑作坊两班倒，比牛马还牛马。一定是你上辈子修来的福报。", 0, 0, 0, 0, 0, 0, 0, 0, CODE_GONGZUO, 0);
const seventGongzuo0 = new specialEvent("颗粒无收", "找了一整年工作，却没有任何一家公司要你。认命吧。", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

const seventKeGaiDasi = new specialEvent("严抓毕设质量", "为迎接教育部门检查，校领导要求提升本科学位论文质量，加强论文评审工作。", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
const seventShiJuanDasi = new specialEvent("放放水啦", "毕业答辩前夕，班上一位同学试图一跃解千愁。院领导连夜开会，要求论文答辩放水，防止类似事件再次发生。", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);


//其它特殊事件

//负面事件。根据风险值，概率触发。
const seventMaiBi = new specialEvent("买笔", "有人上门推销，自称是经济系毕业班学生，在做社会实践，要你买他的笔。一看就是骗子。你揍了他一顿，不得不赔他医药费。（损失一笔钱，大幅消耗体力、精力、心情，小幅提升战斗力。）", -GRI(1500,2500),  -GRI(17,23),  -GRI(17,23), -GRI(17,23), 0, 0, 1, 1, 0, 0);
const seventKeGai = new specialEvent("教学质量", "连续好几届学生反映，期末考试太简单、没有区分度。任课老师痛定思痛，狠抓教学质量，顺便加大期末考试难度。（降低本学期期末考试成绩。）", 0, 0, 0, 0, 0, 0, 0, 0, 0, -GRI(8,12));
const seventChaoJia = new specialEvent("寝室矛盾", "因为寝室卫生问题，跟室友大打出手。双方都很不爽。（大幅降低心情、精力，提高战斗力。）", 0,  -GRI(17,23), 0,  -GRI(17,23), 0, 0, GRI(1,3), GRI(4,5), 0, 0);
const seventXueHan = new specialEvent("血汗工厂", "被辅导员卖去血汗工厂打工。搭进去半条命，却只拿到几百块劳务费。", GRI(400,600), 0, -GRI(40,60), 0, 0, 0, 0, 0, 0, 0);
const seventHengHuo = new specialEvent("飞来横祸", "上学路上被板砖砸到脑袋。乍看上去没问题，但说不定会落下后遗症。（可能小幅降低智力）", 0, 0, 0, 0, -GRI(0,2), 0, 0, 0, 0, 0);
const badSeventList = [seventMaiBi, seventKeGai, seventChaoJia, seventXueHan, seventHengHuo];
//极端负面事件
const seventZhaPian = new specialEvent("AI诈骗", "有人用AI大模型生成视频，冒充你的辅导员让你打钱。血亏一万块不说，心情也变差了。", -10000,  -GRI(17,23), 0, 0, 0, 0, 0, 0, 0, 0);
const seventXiaDu = new specialEvent("饮水机下毒", "室友往饮水机里放慢性毒药。你偶尔感到不舒服，但没想太多。不知不觉中变傻了。（极大幅度降低智商、财商）", 0, 0, 0, 0, -GRI(4,6), -GRI(4,6), 0, 0, 0, 0);
const seventJueWang = new specialEvent("绝望", "学校发布就业报告。你仔细阅读，发现你们学院的本科就业率只有个位数。你绝望了。", 0, -100, 0, 0, 0, 0, 0, 0, 0, 0);
const seventChuanXiao = new specialEvent("被骗进传销窝点", "你的好朋友要带你一起发财。你同意了，结果被骗到传销窝点。你耗尽全部体力，总算找到机会逃出来。", 0, 0, -100, 0, 0, 0, 0, 0, 0, 0);
const seventDiuShuJu = new specialEvent("电脑坏了", "你的创新项目即将结项答辩，结果做好的文件打不开了。你拆下硬盘，去电脑城找人恢复数据，又被骗了一笔钱。（精力清空。）", -GRI(1500,2500), 0, 0, -100, 0, 0, 0, 0, 0, 0);
const vbadSeventList = [seventZhaPian, seventXiaDu, seventJueWang, seventChuanXiao, seventDiuShuJu];


//正面事件 根据幸运值，概率触发。
const seventJianQian = new specialEvent("捡钱", "上学路上捡到一个钱包，里面有几千块钱。真走运。", GRI(2000,4000), 0, 0, 0, 0, 0, 0, 0, 0, 0);
const seventJiangzuo = new specialEvent("听讲座", "听了一场经济学讲座。学到不少经济知识，还收到一个小礼物。（获得几百块钱，提升财商。）", GRI(400,600), 0, 0, 0, 0, GRI(1,3), 0, 0, 0, 0);
const seventShiJuan = new specialEvent("往年试卷", "意外地入手一份去年的期末考试卷。虽然无法确定真假，但看着像那么回事。（提升期末考试成绩）", 0, 0, 0, 0, 0, 0, 0, 0, 0, GRI(8,12));
const seventJingSai = new specialEvent("竞赛获奖", "参加学校举办的知识竞赛，意外获奖。感觉突然变聪明了？（恢复心情、精力，小幅提升智商。）", 0, GRI(8,12), 0, GRI(8,12), 1, 0, 0, 0, 0, 0);
const seventPoCai = new specialEvent("破财消灾", "丢了一百块钱，或许是什么好兆头。（略微降低负面事件发生概率。）", -100, 0, 0, 0, 0, 0, 0, -GRI(3,5), 0, 0);
const goodSeventList = [seventJianQian, seventJiangzuo, seventShiJuan, seventJingSai, seventPoCai];
//给更强buff的正面事件
const seventManJi = new specialEvent("满分预定", "你完成了老师布置的大作业。老师很满意，让你向全班同学作报告，并当场宣布你期末满分。", 0, 0, 0, 0, 0, 0, 0, 0, 0, 100);
const seventZhanLi = new specialEvent("战力爆表", "上课时遭到恐怖袭击。你临危不乱，利用教室桌椅做掩护，徒手制服三名持枪的恐怖分子。战斗力极大幅度上升，还得到了五千块奖金。", 5000, 0, 0, 0, 0, 0, GRI(4,6), 0, 0, 0);
const seventXianRen = new specialEvent("仙人抚顶", "梦中受智慧之神点拨，洞察万物之理。智商极大幅度上升。", 0, 0, 0, 0, GRI(4,6), 0, 0, 0, 0, 0);
const seventYinHang = new specialEvent("和行长吃饭", "你的二代室友和银行行长吃饭，顺便拉你凑数。你听到不少内幕消息，理财观念被刷新。（财商极大幅度提升。）", 0, 0, 0, 0, 0, GRI(4,6), 0, 0, 0, 0);
const seventXinPing = new specialEvent("心平气和", "调理阴阳，达到天人合一的境界。身心都得到休息，与世无争。", 0, GRI(40,60), GRI(40,60), GRI(40,60), 0, 0, 0, -GRI(8,12), 0, 0);
const vgoodSeventList = [seventManJi, seventZhanLi, seventXianRen, seventYinHang, seventXinPing];


//随机数方法
function GRI(min, max) {
    if (min >= max) {
        return max;
    }  //这个判断可能是多余的
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
