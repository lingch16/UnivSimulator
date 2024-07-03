//一些简单的计算函数。
//注意，部分函数涉及对全局变量的访问与修改。


//生成min和max之间的随机整数，包括min和max。最大不超过max
function getRandomInteger(min, max) {
    if (min >= max) {
        return max;
    }  //这个判断可能是多余的
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//随机给出玩家初始属性。可以选择通关特典，获得特殊加成
function initializePlayerBuild(currentPlayer, giftstr1, giftstr2) {
    //不启用任何特典的情况下，四项属性取0-10之间的随机数。
    let wl = 0;  //wealth lower limit
    let wu = 10;
    let il = 0;
    let iu = 10;
    let hl = 0;
    let hu = 10;
    let fl = 0;
    let fu = 10;
    currentPlayer.money = 0;
    //通关特典giftExam，涉及期末考试相关计算。由于作为玩家属性的examBase每学期都被置零，这里不做修改。在期末考试部分做修改。此处只设置一个flag。
    if (giftstr1 === giftExam || giftstr2 === giftExam) {
        flagJuanWang = true;
    }
    switch(giftstr1) {
        case giftAttr1: {
            wl += 2;
            il += 2;
            hl += 2;
            fl += 2;
            break;
        }
        case giftLuck1: {
            currentPlayer.luck += 2;
            break;
        }
        case giftBattle1: {
            currentPlayer.battle += 2;
            break;
        }
        case giftInt1: {
            il += 6;
            break;
        }
        case giftHor1: {
            hl += 6;
            break;
        }
        case giftFin1: {
            fl += 6;
            break;
        }
        case giftWea1: {
            wl += 6;
            break;
        }
        case giftAttr2: {
            wl += 4;
            il += 4;
            hl += 4;
            fl += 4;
            break;
        }
        case giftLuck2: {
            currentPlayer.luck += 5;
            break;
        }
        case giftBattle2: {
            currentPlayer.battle += 5;
            break;
        }
        case giftWeaex: {
            wl += 10;
            currentPlayer.battle += 5;
            iu -= 8;
            break;
        }
        case giftMoney: {
            wu -= 7;
            currentPlayer.money += 25000;
            break;
        }
        case giftAttr3: {
            wl += 6;
            il += 6;
            hl += 6;
            fl += 6;
            break;
        }
        case giftExceed: {
            wu += 7;
            iu += 7;
            hu += 7;
            fu += 7;
            break;
        }
        case giftLuck3: {
            currentPlayer.luck += 12;
            break;
        }
        default:
            break;
    }
    switch(giftstr2) {
        case giftAttr1: {
            wl += 2;
            il += 2;
            hl += 2;
            fl += 2;
            break;
        }
        case giftLuck1: {
            currentPlayer.luck += 2;
            break;
        }
        case giftBattle1: {
            currentPlayer.battle += 2;
            break;
        }
        case giftInt1: {
            il += 6;
            break;
        }
        case giftHor1: {
            hl += 6;
            break;
        }
        case giftFin1: {
            fl += 6;
            break;
        }
        case giftWea1: {
            wl += 6;
            break;
        }
        case giftAttr2: {
            wl += 4;
            il += 4;
            hl += 4;
            fl += 4;
            break;
        }
        case giftLuck2: {
            currentPlayer.luck += 5;
            break;
        }
        case giftBattle2: {
            currentPlayer.battle += 5;
            break;
        }
        case giftWeaex: {
            wl += 10;
            currentPlayer.battle += 5;
            iu -= 8;
            break;
        }
        case giftMoney: {
            wu -= 7;
            currentPlayer.money += 25000;
            break;
        }
        case giftAttr3: {
            wl += 6;
            il += 6;
            hl += 6;
            fl += 6;
            break;
        }
        case giftExceed: {
            wu += 7;
            iu += 7;
            hu += 7;
            fu += 7;
            break;
        }
        case giftLuck3: {
            currentPlayer.luck += 12;
            break;
        }
        default:
            break;
    }

    currentPlayer.wealth = getRandomInteger(wl, wu);
    currentPlayer.intelligence = getRandomInteger(il, iu);
    currentPlayer.horizon = getRandomInteger(hl, hu);
    currentPlayer.finance = getRandomInteger(fl, fu);
    //初始金钱为100乘家境平方，再加1000。即，初始金钱在1000-11000范围变动。
    currentPlayer.money += 100 * currentPlayer.wealth * currentPlayer.wealth + 2000;
    //家境对财商的加成。取整数。
    currentPlayer.finance += Math.floor(currentPlayer.wealth / 2);
    //注意，启用超越极限特典的情况下，家境、智力值可能突破10。高考填志愿、结算等页面应做相应处理。
    return;
}

//阻止用户选择超过三项
function checkCollegeSelections(checkbox, selectedCheckboxes) {
    if (checkbox.checked) {
        // 如果选中，添加到选中列表
        if (selectedCheckboxes.length >= 3) {
          // 如果选择的数量已达到限制，取消选中
          checkbox.checked = false;
          alert("最多选择三项！");
          return;
        }
        selectedCheckboxes.push(checkbox);
    } else {
        // 如果取消选中，从选中列表中移除
        let index = selectedCheckboxes.indexOf(checkbox);
        if (index !== -1) {
          selectedCheckboxes.splice(index, 1);
        }
    }
}

//给填志愿页各大学选项加描述
function appendUnivtext (li, name, text) {
    let div1 = document.createElement("div");
    let div2 = document.createElement("div");
    div1.className = "apply-univname";
    div2.className = "apply-univtext"
    div1.textContent = name;
    div2.textContent = text;
    li.appendChild(div1);
    li.appendChild(div2);
    return;
}


//从给定的规划组中随机选出count个规划
function selectRandomPlans(plansArray, count) {
    let selectedPlans = [];
    let usedIndices = new Set();

    while (selectedPlans.length < count) {
        let index = Math.floor(Math.random() * plansArray.length);
        // 确保不会重复选择相同的计划
        if (!usedIndices.has(index)) {
            usedIndices.add(index);
            selectedPlans.push(plansArray[index]);
        }
    }
    return selectedPlans;
}
//期末考试相关计算

//该函数返回一个数组。数组每个元素都是0-100的整数，代表考试成绩。数组长度代表一共考多少门课。
function calFinalExam(inte, base, univ, eNum, luck) {
    //分数取值范围在0-100，相关属性提高随机下限。
    let lLimit = base + luck + inte * 6 + 10 * univ.tier;

    let final = [];
    //对每门课分别做判定
    for (let i = 0; i < eNum; i++) {
        //如果下限超过100，则判定为满分。
        let result = 0;
        if (lLimit >= 100) {
            result = 100;
        } else {
            result = getRandomInteger(lLimit, 100);
        }
        //根据学校的竞争激烈度，对最终分数做调整
        result -= 2 * univ.pressure;
        //负数的情况下，调整为0分。
        if (result < 0) {
            result = 0;
        }
        //如果挂科，根据幸运值给一次补救机会。
        if (result < 60) {
            let z = getRandomInteger(0, 20);
            if (z <= luck) {
                result = 60;
            }
        }
        final.push(result);
    }
    return final;
}
//计算绩点。注意，该函数返回一个0-400的整数。显示给用户时，应先乘0.01
function calExamGPA(exam) {
    //复制数组
    let gpa = [];
    let sum = 0;
    for (let i = 0; i < exam.length; i++){
        gpa.push(exam[i]);
    }

    //百分制成绩换算成绩点。保留两位小数，即取0-400的整数。
    for (let i = 0; i < gpa.length; i++){
        if (gpa[i] >= 90) {
            gpa[i] = 400;
        } else if (gpa[i] >= 85) {
            gpa[i] = 370;
        } else if (gpa[i] >= 82) {
            gpa[i] = 330;
        } else if (gpa[i] >= 78) {
            gpa[i] = 300;
        } else if (gpa[i] >= 75) {
            gpa[i] = 270;
        } else if (gpa[i] >= 71) {
            gpa[i] = 230;
        } else if (gpa[i] >= 66) {
            gpa[i] = 200;
        } else if (gpa[i] >= 62) {
            gpa[i] = 170;
        } else if (gpa[i] >= 60) {
            gpa[i] = 130;
        } else {
            gpa[i] = 0;
        }

        sum += gpa[i];
    }

    let result = Math.floor(sum / gpa.length);
    return result;
}
function score2GPA(score) {
    //把百分制成绩数组换算成GPA数组
    let gpa = [];
    for (let i = 0; i < score.length; i++){
        gpa.push(score[i]);
    }
    for (let i = 0; i < gpa.length; i++){
        if (gpa[i] >= 90) {
            gpa[i] = 400;
        } else if (gpa[i] >= 85) {
            gpa[i] = 370;
        } else if (gpa[i] >= 82) {
            gpa[i] = 330;
        } else if (gpa[i] >= 78) {
            gpa[i] = 300;
        } else if (gpa[i] >= 75) {
            gpa[i] = 270;
        } else if (gpa[i] >= 71) {
            gpa[i] = 230;
        } else if (gpa[i] >= 66) {
            gpa[i] = 200;
        } else if (gpa[i] >= 62) {
            gpa[i] = 170;
        } else if (gpa[i] >= 60) {
            gpa[i] = 130;
        } else {
            gpa[i] = 0;
        }
    }
    return gpa;
}
function gpaArray2GPA (array) {
    //计算平均绩点
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
        sum += array[i];
    }
    let result = Math.floor(sum / array.length);
    return result;
}

//计算四级得分
function calCetScore (player) {
    let base = (player.intelligence + player.luck) * 20 + cetBase + 235 - (player.univRank * 10); 
    //数值参考： 智商10、大学排名第一，随机下限正好是425
    if (base >= 710) {
        return 710;
    }
    if (base < 0) {
        base = 0;
    }
    let score = getRandomInteger(base, 710);
    return score;    
}

//计算实习
//3： 好实习 2：一般的实习  1：差实习 0：没找到
function calShixi (player) {
    let base = player.horizon + player.finance + player.battle + shixiBase + player.luck - player.univRank;

    switch (player.majorCode) {
        case ART_MAJOR: 
        base -= 10;
        break;
        case SOCIAL_MAJOR:
        case ENGINEER_MAJOR:
        base += 5;
        break;
	case MEDICAL_MAJOR:     
        base -= 5;   //增加游戏难度
	//base += 10;           
        break;
        default:
        break;
    }

    if (base > 100) {
        return 3;
    }
    let x1 = getRandomInteger(base, 100);
    let x2 = getRandomInteger(base, 100);
    let x3 = getRandomInteger(base, 100);

    if (x1 > 90 || x2 > 90 || x3 > 90) {
        return 3;
    }
    if (x1 > 80 || x2 > 80 || x3 > 80) {
        return 2;
    }
    if (x1 > 60 || x2 > 60 || x3 > 60) {
        return 1;
    }
    return 0;
}

//计算保研
//3：保上顶尖名校  2：保一般的学校  1：保差的学校  0：没有
function calBaoYan (player) {
    if (!flagShixi) {
        return 0;
    }
    let base = player.horizon + player.battle + player.finance + (player.luck + player.intelligence) * 2 - player.univRank * 3;

    switch (player.majorCode) {
        case ART_MAJOR:
        base -= 20;
        break;
	case MEDICAL_MAJOR:
        //base += 5;
	base -= 10;   //增加游戏难度
        break;
        case SCIENCE_MAJOR:
        base += 10;
        break;
        default:
        base -= 5;
        break;
    }

    if (base > 100) {
        return 3;
    }

    let x1 = getRandomInteger(base, 100);
    let x2 = getRandomInteger(base, 100);
    let x3 = getRandomInteger(base, 100);

    if (x1 > 90 || x2 > 90 || x3 > 90) {
        return 3;
    }
    if (x1 > 80 || x2 > 80 || x3 > 80) {
        return 2;
    }
    if (x1 > 60 || x2 > 60 || x3 > 60) {
        return 1;
    }
    return 0;        
}  

//计算考研
//3表示考上好学校，2表示考上一般学校，1表示达到国家线，0表示没达到国家线。
function calKaoYan (player) {
    let base = kaoyanBase + (player.intelligence + player.luck + player.battle - player.univRank) * 5;
    if (base >= 500) {
        return 3;
    }

    if (base >= 300 || player.univRank <= 4) {
        base -= 100;
        let z = getRandomInteger(base, 500);
        if (z > 400) {
            return 3;
        }
        return 1;
    }

    if (player.univRank === 11) {
        base += 50; //考研神校特殊加成
    }
    
    let y = getRandomInteger(base, 500);

    if (y > 350) {
        return 2;
    }
    return 0;
}

//考研调剂计算
function tiaojiShangan (player) {
    let base = (player.horizon + player.finance) * 2 + player.battle + player.luck;
    let z = getRandomInteger(0, 100);
    if (base > z)
        return true;
    let y = getRandomInteger(0, 35);
    if (y <= player.luck) {
        return true;
    }
    return false;
}

//找工作计算
//3表示好工作，2表示一般工作，1表示差工作，0表示没找到。
function seekJob (player, count) {
    //找工作主要和眼界有关
    let m = getRandomInteger(0, 50);
    if (m <= player.luck) {
        return 3;
    }

    let y = player.horizon * 3 + player.finance + player.intelligence + player.battle + player.luck + 100 - (player.univRank * 10);

    if (flagShixi) {
        y += 100;
    }
    if (flagCet) {
        y += 50;
    }
    if (flagRongYu) {
        y += 50;
    }

    switch (player.majorCode) {
        case ENGINEER_MAJOR: 
        y += 70;
        break;
	case MEDICAL_MAJOR: 
        //y += 50;
	y -= 30;   //增加游戏难度
        break;
        case SOCIAL_MAJOR:
        case SCIENCE_MAJOR:
        y += 30;
        break;
        default:
        break;
    }

    if (player.univRank <= 4) {
        for (let i = 0; i < count; i++) {
            let z = getRandomInteger(0, 4000);
            if (y > z) {
                return 3;
            }
        }
        return 0;
    }
    if (player.univRank === 20) {
        return 1;
    }

    for (let i = 0; i < count; i++) {
        let j = getRandomInteger(0, 100);
        if (j > 60) {
            let z = getRandomInteger(0, 4000);
            if (y > z) {
                return 3;
            }
        } else if (j > 30) {
            let z = getRandomInteger(0, 2500);
            if (y > z) {
                return 2;
            }
        } else {
            let z = getRandomInteger(0, 1000);
            if (y > z) {
                return 1;
            }
        }
    }
    return 0;
     
}

//毕业论文计算
function calLunwen(player) {
    let base = lunwenBase + player.intelligence + player.battle - player.univRank;
    switch(player.majorCode) {
        case ART_MAJOR:
        base += ART_DIFF;
        break;
        case SOCIAL_MAJOR:
        base += SOCIAL_DIFF;
        break;
        case ENGINEER_MAJOR:
        base += ENGINEER_DIFF;
        break;
        case SCIENCE_MAJOR:
        base += SCIENCE_DIFF;
        break;
	case MEDICAL_MAJOR:
        base += MEDICAL_DIFF;
        break;
    }
    if (base >= 100) {
        return 100;
    }
    let z = getRandomInteger (base, 100);

    if (z < 60) {
        let x = getRandomInteger(0, 30);
        if (x <= player.luck) {
            return 60;
        }
    }
    return z;
}






//游戏结算页相关
function wealth2RatingSpan(wealth) {
    //输入表示家境的0-10的数，返回一个带有样式的span
    let spanname = document.createElement("span");
    spanname.textContent = "家境：";
    let spanrating = document.createElement("span");

    
    if (wealth === 10) {
        spanrating.textContent = wealth.toString() + "    中产";
        spanrating.className = "attr-rating-A";
    } else if (wealth >= 7) {
        spanrating.textContent = wealth.toString() + "    小康";
        spanrating.className = "attr-rating-B";
    } else if (wealth >= 4) {
        spanrating.textContent = wealth.toString() + "    温饱";
        spanrating.className = "attr-rating-C";
    } else {
        spanrating.textContent = wealth.toString() + "    贫困";
        spanrating.className = "attr-rating-D";
    }
    if (wealth > 10) {
        spanrating.textContent = wealth.toString() + "    富裕";
        spanrating.className = "attr-rating-S";
    }

    let span = document.createElement("span");
    span.appendChild(spanname);
    span.appendChild(spanrating);
    return span;
}
function univ2RatingSpan(univrank) {
    let univ = univList.find(un => un.rank === univrank);
    let spanname = document.createElement("span");
    spanname.textContent = "就读院校：";
    let spanrating = document.createElement("span");

    if (univrank === 1) {
        spanrating.textContent = univ.name + "    顶尖";
        spanrating.className = "attr-rating-S";
    } else if (univrank <= 4) {
        spanrating.textContent = univ.name + "    一流";
        spanrating.className = "attr-rating-A";
    } else if (univ.rank <= 8) {
        spanrating.textContent = univ.name + "    省重点";
        spanrating.className = "attr-rating-B";
    } else if (univ.rank <= 11) {
        spanrating.textContent = univ.name + "    普通";
        spanrating.className = "attr-rating-C";
    } else if (univ.rank === 12) {
        spanrating.textContent = univ.name + "    不太行";
        spanrating.className = "attr-rating-D";
    } else {
        spanrating.textContent = univ.name + "    辣鸡";
        spanrating.className = "attr-rating-E";
    }
    let span = document.createElement("span");
    span.appendChild(spanname);
    span.appendChild(spanrating);
    return span;
}
function inte2RatingSpan(intelligence, endflag) {
    let spanname = document.createElement("span");
    spanname.textContent = "智力：";
    let spanrating = document.createElement("span");

    if (intelligence > 30) {
        spanrating.textContent = intelligence.toString() + "    超凡";
        spanrating.className = "attr-rating-S";
    } else if (intelligence > 25) {
        spanrating.textContent = intelligence.toString() + "    天才";
        spanrating.className = "attr-rating-A";
    } else if (intelligence > 20) {
        spanrating.textContent = intelligence.toString() + "    聪明";
        spanrating.className = "attr-rating-B";
    } else if (intelligence > 15) {
        spanrating.textContent = intelligence.toString() + "    普通";
        spanrating.className = "attr-rating-C";
    } else if (intelligence > 10) {
        spanrating.textContent = intelligence.toString() + "    愚笨";
        spanrating.className = "attr-rating-D";
    } else {
        spanrating.textContent = intelligence.toString() + "    制杖";
        spanrating.className = "attr-rating-E";
    }

    if (endflag === NOBEL_END){
        spanrating.textContent = "***" + "    不可说";
        spanrating.className = "attr-rating-E";
    }

    let span = document.createElement("span");
    span.appendChild(spanname);
    span.appendChild(spanrating);
    return span;
}
function hor2RatingSpan(horizon) {
    let spanname = document.createElement("span");
    spanname.textContent = "眼界：";
    let spanrating = document.createElement("span");

    if (horizon >= 40) {
        spanrating.textContent = horizon.toString() + "    弥纶天地";
        spanrating.className = "attr-rating-S";
    } else if (horizon >= 30) {
        spanrating.textContent = horizon.toString() + "    高瞻远瞩";
        spanrating.className = "attr-rating-A";
    } else if (horizon >= 25) {
        spanrating.textContent = horizon.toString() + "    见多识广";
        spanrating.className = "attr-rating-B";
    } else if (horizon >= 20) {
        spanrating.textContent = horizon.toString() + "    普通";
        spanrating.className = "attr-rating-C";
    } else if (horizon >= 10) {
        spanrating.textContent = horizon.toString() + "    目光短浅";
        spanrating.className = "attr-rating-D";
    } else {
        spanrating.textContent = horizon.toString() + "    井底之蛙";
        spanrating.className = "attr-rating-E";
    }

    let span = document.createElement("span");
    span.appendChild(spanname);
    span.appendChild(spanrating);
    return span;
}
function fin2RatingSpan(finance) {
    let spanname = document.createElement("span");
    spanname.textContent = "财商：";
    let spanrating = document.createElement("span");

    if (finance >= 35) {
        spanrating.textContent = finance.toString() + "    世界级投资家";
        spanrating.className = "attr-rating-S";
    } else if (finance >= 30) {
        spanrating.textContent = finance.toString() + "    专业投资者";
        spanrating.className = "attr-rating-A";
    } else if (finance >= 25) {
        spanrating.textContent = finance.toString() + "    投机客";
        spanrating.className = "attr-rating-B";
    } else if (finance >= 20) {
        spanrating.textContent = finance.toString() + "    公墓经理";
        spanrating.className = "attr-rating-C";
    } else if (finance >= 10) {
        spanrating.textContent = finance.toString() + "    韭菜";
        spanrating.className = "attr-rating-D";
    } else {
        spanrating.textContent = finance.toString() + "    不会数钱";
        spanrating.className = "attr-rating-E";
    }

    let span = document.createElement("span");
    span.appendChild(spanname);
    span.appendChild(spanrating);
    return span;
}
function battle2RatingSpan(battle) {
    let spanname = document.createElement("span");
    spanname.textContent = "战斗力：";
    let spanrating = document.createElement("span");

    if (battle >= 25) {
        spanrating.textContent = battle.toString() + "    战神";
        spanrating.className = "attr-rating-S";
    } else if (battle >= 20) {
        spanrating.textContent = battle.toString() + "    王者";
        spanrating.className = "attr-rating-A";
    } else if (battle >= 15) {
        spanrating.textContent = battle.toString() + "    校霸";
        spanrating.className = "attr-rating-B";
    } else if (battle >= 10) {
        spanrating.textContent = battle.toString() + "    寝室扛把子";
        spanrating.className = "attr-rating-C";
    } else if (battle > 5) {
        spanrating.textContent = battle.toString() + "    打过架";
        spanrating.className = "attr-rating-D";
    } else {
        spanrating.textContent = battle.toString() + "    只有5的渣渣";
        spanrating.className = "attr-rating-E";
    }

    let span = document.createElement("span");
    span.appendChild(spanname);
    span.appendChild(spanrating);
    return span;
}
function end2RatingSpan(endflag) {
    let spanname = document.createElement("span");
    spanname.textContent = "结局：";
    let spanrating = document.createElement("span");

    if (endflag === MOOD_END || endflag === STRENGTH_END || endflag === SPIRIT_END || endflag === RISK_END || endflag === GUAKE_END) {
        spanrating.textContent = "中道崩殂" + "    E";
        spanrating.className = "attr-rating-E";
    }
    if (endflag === ART_END || endflag === SOC_END || endflag === ENG_END || endflag === SCI_END || endflag === MED_END) {
        spanrating.textContent = "倒在毕业前夕" + "    E";
        spanrating.className = "attr-rating-E";
    }
    if (endflag === BAOYAN_END) {
        if (flagBaoyan3) {
            spanrating.textContent = "名校保研" + "    A";
            spanrating.className = "attr-rating-A";
        } else if (flagBaoyan2) {
            spanrating.textContent = "保研" + "    B";
            spanrating.className = "attr-rating-B";
        } else {
            spanrating.textContent = "辣鸡学校保研" + "    C";
            spanrating.className = "attr-rating-D";
        }
    }
    if (endflag === KAOYAN_END) {
        if (flagKaoYan3) {
            spanrating.textContent = "名校研究生" + "    A";
            spanrating.className = "attr-rating-A";
        } else if (flagKaoYan2) {
            spanrating.textContent = "读研" + "    B";
            spanrating.className = "attr-rating-B";
        } else {
            spanrating.textContent = "辣鸡学校读研" + "    C";
            spanrating.className = "attr-rating-D";
        }
    }
    if (endflag === PERFECT_END) {
        spanrating.textContent = "天选之子" + "    S";
        spanrating.className = "attr-rating-S";
    }
    if (endflag === GONGZUO3_END) {
        spanrating.textContent = "职场精英" + "    A";
        spanrating.className = "attr-rating-A";
    }
    if (endflag === GONGZUO2_END) {
        spanrating.textContent = "平凡的上班族" + "    B";
        spanrating.className = "attr-rating-B";
    }
    if (endflag === BIYE_SHIYE_END) {
        spanrating.textContent = "毕业即失业" + "    C";
        spanrating.className = "attr-rating-C"
    }
    if (endflag === DANBIYE_END) {
        spanrating.textContent = "单证战士" + "    D";
        spanrating.className = "attr-rating-D";
    }
    if (endflag === GONGZUO1_END) {
        spanrating.textContent = "黑作坊牛马" + "    D";
        spanrating.className = "attr-rating-D";
    }
    if (endflag === JIEYE_END) {
        spanrating.textContent = "大学结业" + "    D";
        spanrating.className = "attr-rating-D"; 
    }
    if (endflag === XSH_END) {
        spanrating.textContent = "学生会长" + "    S";
        spanrating.className = "attr-rating-S";
    }
    if (endflag === GGZ_END) {
        spanrating.textContent = "沉迷页游" + "    S";
        spanrating.className = "attr-rating-S";
    }
    if (endflag === NOBEL_END) {
        spanrating.textContent = "诺奖得主" + "    S";
        spanrating.className = "attr-rating-S";
    }



    let span = document.createElement("span");
    span.appendChild(spanname);
    span.appendChild(spanrating);
    return span;
}
function end2rank(endflag) {
    let rank = 0;
    switch (endflag) {
        case NOBEL_END:
        case GGZ_END:
        case XSH_END:
        case PERFECT_END:
        rank = S_END_RANK;
        break;
        case GONGZUO3_END:
        case BAOYAN3_END:
        case KAOYAN3_END:
        rank = A_END_RANK;
        break;
        case BAOYAN2_END:
        case KAOYAN2_END:
        case GONGZUO2_END:
        rank = B_END_RANK;
        break;
        case BAOYAN1_END:
        case BIYE_SHIYE_END:
        case KAOYAN1_END:
        rank = C_END_RANK;
        break;
        case GONGZUO1_END:
        case DANBIYE_END:
        case JIEYE_END:
        rank = D_END_RANK;
        break;
        default:
        rank = E_END_RANK;
    }
    return rank;
}
function endrank2string(rank) {
    switch (rank) {
        case S_END_RANK:
        return "S";
        case A_END_RANK:
        return "A";
        case B_END_RANK:
        return "B";
        case C_END_RANK:
        return "C";
        case D_END_RANK:
        return "D";
        case E_END_RANK:
        return "E";
        default:
        return "--";
    }
}
function endRecordDiv (rank) {
    let div = document.createElement("div");
    let div1 = document.createElement("div");
    let div2 = document.createElement("div");

    let span1 = document.createElement("span");
    let span2 = document.createElement("span");
    let span3 = document.createElement("span");
    let span4 = document.createElement("span");

    div1.appendChild(span1);
    div1.appendChild(span2);
    div2.appendChild(span3);
    div2.appendChild(span4);
    div.appendChild(div1);
    div.appendChild(div2);

    span1.textContent = "历史最佳：";
    span2.textContent = "  " + endrank2string(bestRecord);
    span3.textContent = "本局评价：";
    span4.textContent = "  " + endrank2string(rank);
    if (rank > bestRecord) {
        span4.textContent += "（新纪录）";
    }
    switch (bestRecord) {
        case S_END_RANK:
        span2.className = "end-rating-S";
        break;
        case A_END_RANK:
        span2.className = "end-rating-A";
        break;
        case B_END_RANK:
        span2.className = "end-rating-B";
        break;
        case C_END_RANK:
        span2.className = "end-rating-C";
        break;
        case D_END_RANK:
        span2.className = "end-rating-D";
        break;
        case E_END_RANK:
        default:
        span2.className = "end-rating-E";
        break;
    }
    switch (rank) {
        case S_END_RANK:
        span4.className = "end-rating-S";
        break;
        case A_END_RANK:
        span4.className = "end-rating-A";
        break;
        case B_END_RANK:
        span4.className = "end-rating-B";
        break;
        case C_END_RANK:
        span4.className = "end-rating-C";
        break;
        case D_END_RANK:
        span4.className = "end-rating-D";
        break;
        case E_END_RANK:
        default:
        span4.className = "end-rating-E";
        break;
    }
    return div;

}
function appendGifttext (li, text, description, rank) {
    let span1 = document.createElement("span");
    let span2 = document.createElement("span");
    span1.textContent = text;
    span2.textContent = description;
    if (rank === GIFT_S_RANK) {
        span1.className = "gift-rating-S";
    }
    if (rank === GIFT_A_RANK) {
        span1.className = "gift-rating-A";
    }
    if (rank === GIFT_B_RANK) {
        span1.className = "gift-rating-B";
    }
    if (rank === GIFT_C_RANK) {
        span1.className = "gift-rating-C";
    }
    if (rank === GIFT_D_RANK) {
        span1.className = "gift-rating-D";
    }
    if (rank === GIFT_E_RANK) {
        span1.className = "gift-rating-E";
    }
    li.appendChild(span1);
    li.appendChild(span2);
    //或许一般不会用id传参，大概有更合适的写法
    li.id = text;
    return;
}

//该函数接受一个字符串表示的特典，返回作为classname的字符串
function gift2SpanClassname (giftstr) {
    switch (giftstr) {
        case giftInt1:
        case giftHor1:
        case giftFin1:
        case giftWea1:
        return "gift-rating-D";
        case giftAttr2:
        case giftLuck2:
        case giftBattle2:
        return "gift-rating-C";
        case giftWeaex:
        case giftMoney:
        case giftExam:
        return "gift-rating-B";
        case giftAttr3:
        return "gift-rating-A";
        case giftExceed:
        case giftLuck3:
        return "gift-rating-S";
        default:
        return "gift-rating-E";
    }
} 
