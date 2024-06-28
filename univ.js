//大学相关

class Univ{
    constructor(name, text, rank, tier, intelligence, horizon, finance, risk, pressure, fee, majorCode, exbuild) {
        this.name = name;   //大学校名
        this.text = text;   //大学描述
        this.rank = rank;   //大学排名
        this.tier = tier;   //大学梯队
        this.intelligence = intelligence;   //学年结束时对智力的加成
        this.horizon = horizon;          //学年结束时对眼界的加成
        this.finance = finance;           //学年结束时对财商的加成
        this.risk = risk;             //学年结束时增加风险度
        this.pressure = pressure;     //内卷度，与期末考相关
        this.fee = fee;               //大学学费
        this.majorCode = majorCode;   //大学特色专业
        this.exbuild = exbuild;       //大学特色加成
    }
    //不同档次学校给玩家不同加成，每年年底计算一次。
    update(currentPlayer) {
        currentPlayer.intelligence += this.intelligence;
        currentPlayer.horizon += this.horizon;
        currentPlayer.finance += this.finance;
        currentPlayer.risk += this.risk;
        //大学特色加成
        //如果玩家选择该校特色专业，则享受加成
        if (this.majorCode === currentPlayer.major) {
            currentPlayer.intelligence += this.exbuild;
            currentPlayer.horizon += this.exbuild;
            currentPlayer.finance += this.exbuild;
        }
    }
}

const rank1Univ = new Univ("北京的大学", "简称北大，各项指标都很强劲。大学里的最强王者。", 1, 0, 4, 4, 4, 2, 5, 6000, 0, 0);
const rank2Univ = new Univ("上海的大学", "沪滨屹立东南冠，实力不容小觑。", 2, 1, 3, 4, 4, 2, 4, 6500, 0, 0);
const rank3Univ = new Univ("浙江的大学", "简称浙大，top3大学，省内巨无霸。", 3, 1, 4, 3, 4, 3, 4, 6500, 0, 0);
const rank4Univ = new Univ("南京的大学", "简称南大，学风正，当之无愧的第一梯队。", 4, 1, 4, 3, 3, 3, 4, 6000, 0, 0);
const rank5Univ = new Univ("某财经大学", "社科类专业实力强劲。", 5, 2, 2, 3, 3, 2, 3, 8000, socialMajorCode, 1);
const rank6Univ = new Univ("某科技大学", "只有科学没有技术，理科实力强劲。", 6, 2, 3, 2, 2, 3, 4, 6500, scienceMajorCode, 1);
const rank7Univ = new Univ("某师范大学", "学校优先发展纯文科，人文大类是业界翘楚。", 7, 2, 2, 2, 2, 2, 3, 7000, artMajorCode, 1);
const rank8Univ = new Univ("某工业大学", "学校以工科起家，近期在向新工科转型。", 8, 2, 2, 2, 2, 3, 4, 7000, engineerMajorCode, 1);
const rank9Univ = new Univ("中等偏上的大学", "比较均衡，学费也是中等偏上的。", 9, 3, 2, 2, 2, 2, 2, 8000, 0, 0);
const rank10Univ = new Univ("某考研神校", "只要学不死，就往死里学。", 10, 3, 3, 1, 1, 4, 3, 7500, 0, 0);
const rank11Univ = new Univ("坐落在大城市的大学", "唯一的优点是眼界开阔些。", 11, 3, 1, 2, 1, 2, 2, 8500, 0, 0);
const rank12Univ = new Univ("普通的大学", "能力只有平均值的渣渣，学费却不便宜。", 12, 4, 1, 1, 1, 1, 1, 9000, 0, 0);
const rankexUniv = new Univ("辣鸡大学", "不如不上的烂学校", 20, 5, 0, 0, 0, 1, 0, 10000, 0, 0);

const goodUnivList = [rank1Univ, rank2Univ, rank3Univ, rank4Univ, rank5Univ];
const fairUnivList = [rank5Univ, rank6Univ, rank7Univ, rank8Univ, rank9Univ];
const poorUnivList = [rank8Univ, rank9Univ, rank10Univ, rank11Univ, rank12Univ];
const univList = [rank1Univ, rank2Univ, rank3Univ, rank4Univ, rank5Univ, rank6Univ, rank7Univ, rank8Univ, rank9Univ, rank10Univ, rank11Univ, rank12Univ, rankexUniv];



