

//储存玩家本轮游戏数据
class Player{
    constructor(name, gender, wealth, mood, strength, spirit, intelligence, horizon, finance, luck, risk, money, year, univRank, major, round, examBase, battle, semester, cgpa, tgpa) {
        this.name = name;     //姓名，由玩家自选
        this.gender = gender;  //性别，由玩家自选
        this.wealth = wealth;  //财富，与初始金钱、生活费挂钩
        this.mood = mood;      //心情，心情好才想干活。
        this.strength = strength;  //体力
        this.spirit = spirit;   //精力
        this.intelligence = intelligence;  //智商
        this.horizon = horizon;   //眼界
        this.finance = finance;   //财商，与赚钱相关
        this.luck = luck;   //幸运，可以增加事件判定成功的机率。
        this.risk = risk;        //初始为0。为正值时增加暴毙概率。
        this.money = money;     //玩家的钱
        this.year = year;   //记录玩家现在上大学第几年  
        this.univRank = univRank;  //记录玩家上什么大学
        this.major = major;  //专业
        this.round = round;  //学期规划轮次
        this.examBase = examBase; //期末考试成绩随机下限
        this.battle = battle;  //战斗力
        this.semester = semester;  //学期
        this.cgpa = cgpa;   //上学期绩点   注意，绩点统一用0-400的数表示
        this.tgpa = tgpa;   //总绩点
    }
}


//各显示栏

//标题。随游戏推进，切换学年、学期显示
const titleBanner = {
    title: document.createElement("h1"),
    div: document.createElement("div"),

    createDiv: function() {
        this.title.textContent = "大一上学期";
        this.div.className = "mTitle";
        this.div.appendChild(this.title);
        return this.div;
    },

    updateDiv: function(player) {
        switch (player.year) {
            case 1: {
                titleBanner.title.textContent = "大一";
                break;
            }
            case 2: {
                titleBanner.title.textContent = "大二";
                break;
            }
            case 3: {
                titleBanner.title.textContent = "大三";
                break;
            }
            case 4: {
                titleBanner.title.textContent = "大四";
                break;
            }
        };
        if (player.semester % 2 === 1) {
            titleBanner.title.textContent += "上学期";
        } else {
            titleBanner.title.textContent += "下学期";
        }
    }
}

//重要事件记录栏
const eventRecord = {
    title: document.createElement("h3"),
    list: document.createElement("div"),

    createDiv: function() {
        this.title.textContent = "重要事件记录";
        this.list.innerHTML = ""; //初始化时置零
        let div = document.createElement("div");
        div.appendChild(this.title);
        div.appendChild(this.list);
        div.className = "sidebar";
        return div;
    },

    updateDiv: function(msg) {
        let para = document.createElement("p");
        para.textContent = msg + "！";
        this.list.appendChild(para);
    }
}



//特殊事件栏
const specialEventList = {
    title: document.createElement("h3"),
    div1: document.createElement("div"),
    div2: document.createElement("div"),
    div: document.createElement("div"),
    okbutton: document.createElement("button"),
    cplayer: null,

    createDiv: function(player) {
        //初始化
        this.title.className = "sevent-title";
        this.title.textContent = "发生特殊事件！"
        this.div1.className = "sevent-para1";
        this.div2.className = "sevent-para2";
        this.div.className = "sevent-container";
        this.okbutton.className = "sevent-button";
        this.okbutton.textContent = "知道了";
        this.cplayer = player;

        this.div.appendChild(this.title);
        this.div.appendChild(this.div1);
        this.div.appendChild(this.div2);
        this.div.appendChild(this.okbutton);

        this.okbutton.onclick = () => {
            specialEventList.div.style.display = "none";

            if (eventPhase === 4) {               
                if (flagXueShengHui) {
                    setGameover(player, XSH_END);
                }
                if (flagGuGuZhen) {
                    setGameover(player, GGZ_END);
                }
                if (flagNobel) {
                    setGameover(player, NOBEL_END);
                }
                return;
            }

            if (flagBaoyanEnd) {
                setGameover(specialEventList.cplayer, BAOYAN_END);
                return;
            }

            testEnd(specialEventList.cplayer);

            schoolTodoList.showPlan(specialEventList.cplayer);
        }

        this.div.style.display = "none";
        return this.div;
    },

    showDiv: function(player) {
        //展示
        let ev = specialEventList.getEvent(player);
        specialEventList.div1.textContent = ev.text;
        specialEventList.div2.textContent = ev.description;
        ev.updateAttr(player);
        specialDone = true;


        //一些特殊事件在这做额外处理，updateAttr函数不涉及

        if (ev.code === CODE_PIN_KUN) {
            flagPinKunBuZhu = true;
            eventRecord.updateDiv(seventPinKunRenDing.text);
        }
        if (ev.code === CODE_XUE_SHENG_HUI) {
            flagXueShengHui = true;
            eventPhase = 1;
            eventRecord.updateDiv(seventXueShengHui.text);
        }
        if (ev.code === CODE_GU_GU) {
            flagGuGuZhen = true;
            eventPhase = 1;
            eventRecord.updateDiv(seventGuGuZhen.text);
        }
        if (ev.code === CODE_NOBEL) {
            flagNobel = true;
            eventPhase = 1;
            eventRecord.updateDiv(seventNobel.text);
        }
        if (ev.code === CODE_GUOJIANG || ev.code === CODE_LIZHI) {
            flagRongYu = true;
            eventRecord.updateDiv(seventGuoJiang.text);
        }

        if (ev.code === CODE_XSH1 || ev.code === CODE_GGZ1 || ev.code === CODE_NOBEL1) {
            eventPhase = 2;
        }

        if (ev.code === CODE_XSH2 || ev.code === CODE_GGZ2 || ev.code === CODE_NOBEL2) {
            eventPhase = 3;
        }

        if (ev.code === CODE_XSH3 || ev.code === CODE_GGZ3 || ev.code === CODE_NOBEL3) {
            eventPhase = 4;
        }

        if (ev.code === CODE_XSH1) {
            eventRecord.updateDiv(rXsh1.text);
        }
        if (ev.code === CODE_XSH2) {
            eventRecord.updateDiv(rXsh2.text);
        }
        if (ev.code === CODE_XSH3) {
            eventRecord.updateDiv(rXsh3.text);
        }

        if (ev.code === CODE_GGZ1) {
            eventRecord.updateDiv(rGGZ1.text);
        }
        if (ev.code === CODE_GGZ2) {
            eventRecord.updateDiv(rGGZ2.text);
        }
        if (ev.code === CODE_GGZ3) {
            eventRecord.updateDiv(rGGZ3.text);
        }

        if (ev.code === CODE_NOBEL1) {
            eventRecord.updateDiv(rNobel1.text);
        }
        if (ev.code === CODE_NOBEL2) {
            eventRecord.updateDiv(rNobel2.text);
        }
        if (ev.code === CODE_NOBEL3) {
            eventRecord.updateDiv(rNobel3.text);
        }
        if (ev.code === BAOYAN_GOOD) {
            eventRecord.updateDiv("推免成功");
            flagBaoyanEnd = true;
        }
        if (ev.code === BAOYAN_BAD) {
            eventRecord.updateDiv("推免失败");
        }
        if (ev.code === TIAOJI_GOOD) {
            eventRecord.updateDiv("调剂成功");
            flagKaoshangYan = true;
        }
        if (ev.code === TIAOJI_BAD) {
            eventRecord.updateDiv("调剂失败");
            flagKaoshangYan = false;
        }
        if (ev.code === CODE_GONGZUO) {
            eventRecord.updateDiv("找到工作了");
        }

        specialEventList.div.style.display = "flex";

    },

    getEvent: function(player) {
        //随机获取当前事件

        //找工作事件
        if (player.semester === 8 && player.round > 2) {
            if (flagGongzuo3) {
                return seventGongzuo3;
            }
            if (flagGongzuo2) {
                return seventGongzuo2;
            }
            if (flagGongzuo1) {
                return seventGongzuo1;
            }
            return seventGongzuo0;
        }

        //判定特殊路线后续剧情
        if (player.semester % 2 === 1) {
            switch (eventPhase) {
                case 1: {
                    if (player.year === 4) {
                        break;
                    }
                    if (flagXueShengHui && player.battle >= P1_BATTLE_LIMIT) {
                        return rXsh1;
                    }
                    if (flagNobel && player.intelligence <= P1_IQ_LIMIT && player.battle >= P1_BATTLE_LIMIT) {
                        return rNobel1;
                    }
                    if (flagGuGuZhen && player.money >= 2000 && player.battle >= P1_BATTLE_LIMIT) {
                        return rGGZ1;
                    }
                    break;
                }
                case 2: {
                    if (player.year === 4) {
                        break;
                    }
                    if (flagXueShengHui && player.battle >= P2_BATTLE_LIMIT) {
                        return rXsh2;
                    }
                    if (flagNobel && player.battle >= P2_BATTLE_LIMIT && player.intelligence <= P2_IQ_LIMIT) {
                        return rNobel2;
                    }
                    if (flagGuGuZhen && player.battle >= P2_BATTLE_LIMIT && player.money >= 5000) {
                        return rGGZ2;
                    }
                    break;
                }
                case 3: {
                    if (flagXueShengHui && player.battle >= P3_BATTLE_LIMIT) {
                        return rXsh3;
                    }
                    if (flagNobel && player.battle >= P3_BATTLE_LIMIT && player.intelligence <= P3_IQ_LIMIT) {
                        return rNobel3;
                    }
                    if (flagGuGuZhen && player.battle >= P3_BATTLE_LIMIT && player.money >= 20000) {
                        return rGGZ3;
                    }
                    break;
                }
            };
        }

        //再判定大四上学期特殊事件
        if (player.semester === 7) {
            //保研事件
            if (flagBaoyan2 || flagBaoyan1) {
                if (numFailedExam > 0){
                    return seventBaoyanBad;
                }
                return seventBaoyanGood;
            } else if (flagBaoyan3) {
                if (player.univRank >= 9 || !flagRongYu || numFailedExam > 0) {
                    return seventBaoyanBad;
                }
                return seventBaoyanGood;
            }
        }

        //判定大四下学期特殊事件
        if (player.semester === 8) {
            //考研调剂事件
            if (flagKaoYan1) {
                if (tiaojiShangan(player)) {
                    return seventTiaojiGood;
                } else {
                    return seventTiaojiBad;
                }

            }
        }

        
        //大一上学期，先判定奖学金相关事件
        if (player.year === 1 && player.wealth <= 3 && player.semester % 2 === 1) {
            //第一年、家境值不超过3，获得贫困补助
            return seventPinKunRenDing;
        } else if (flagPinKunBuZhu && player.year > 1 && player.semester % 2 === 1) {  //补助、奖学金事件，都仅在上半学期触发
            //贫困生资格的情况下，依次判定 国奖+贫困补助； 励志+贫困补助； 贫困补助
            //为简化程序计算，用以往学期总绩点代替上学年绩点
            if (player.tgpa > GUOJIANG_LIMIT) {
                return seventPinKunGuoJiang;
            } else if (player.tgpa > LIZHI_LIMIT) {
                return seventLiZhi;
            } else if (player.tgpa > XUEYE_LIMIT) {
                return seventPinKunXueYe;
            } else {
                return seventPinKunBuZhu;
            };
        } else if (player.year > 1 && player.semester % 2 === 1 && player.tgpa > GUOJIANG_LIMIT) {
            return seventGuoJiang;
        } else if (player.year > 1 && player.semester % 2 === 1 && player.tgpa > XUEYE_LIMIT) {
            return seventXueYe;
        }

        //没有获得奖学金的情况下，继续各结局路线相关事件判定
        if (player.year === 1 && player.semester % 2 === 1) {
            //第一年时随机给出各路线前置事件，不发生其它随机事件。
            let z = getRandomInteger(0, 2);
            return seQianZhi[z];
        }


        //如果没进入重要路线，则判定发生哪些随机事件。

        let a = getRandomInteger(0, 100);
        if (a > 50 + player.risk - player.luck) {
            let b = getRandomInteger(0, 200);
            if (b < player.risk) {
                let c = getRandomInteger(0, 4); //随机事件列表都是五个五个一组
                return vbadSeventList[c];
            } else {
                let c = getRandomInteger(0, 4);
                return badSeventList[c];   
            }
        } else {
            let b = getRandomInteger(0, 100);
            if (b < player.luck) {
                let c = getRandomInteger(0, 4);
                return vgoodSeventList[c];
            } else {
                let c = getRandomInteger(0, 4);
                return goodSeventList[c];
            }
        }

        
    }

}
//学期规划栏
const schoolTodoList = {
    
    title: document.createElement("h3"),

    button1: document.createElement("button"),
    button2: document.createElement("button"),
    button3: document.createElement("button"),
    button4: document.createElement("button"),
    button5: document.createElement("button"),

    des1: document.createElement("p"),
    des2: document.createElement("p"),
    des3: document.createElement("p"),
    des4: document.createElement("p"),
    des5: document.createElement("p"),

    bfbox1: document.createElement("div"),
    bfbox2: document.createElement("div"),
    bfbox3: document.createElement("div"),
    bfbox4: document.createElement("div"),
    bfbox5: document.createElement("div"),

    div: document.createElement("div"),
    //以下两个用来传参
    cplans: zeroStrengthPlans,
    cplayer: null,
    
    
    createDiv: function() {
        //初始化
        this.cplans = zeroStrengthPlans;
        this.cplayer = null;

        //button没有checked属性，不好传参，索性写五个函数
        this.button1.addEventListener("click", schoolTodoList.updateAttrB1);
        this.button2.addEventListener("click", schoolTodoList.updateAttrB2);
        this.button3.addEventListener("click", schoolTodoList.updateAttrB3);
        this.button4.addEventListener("click", schoolTodoList.updateAttrB4);
        this.button5.addEventListener("click", schoolTodoList.updateAttrB5);

        this.button1.className = "splan-button";
        this.bfbox1.className = "splan-buttonbox";

        this.button2.className = "splan-button";
        this.bfbox2.className = "splan-buttonbox";

        this.button3.className = "splan-button";
        this.bfbox3.className = "splan-buttonbox";

        this.button4.className = "splan-button";
        this.bfbox4.className = "splan-buttonbox";

        this.button5.className = "splan-button";
        this.bfbox5.className = "splan-buttonbox";

        this.title.className = "splan-title";

        this.bfbox1.appendChild(this.button1);
        this.bfbox1.appendChild(this.des1);
        this.bfbox2.appendChild(this.button2);
        this.bfbox2.appendChild(this.des2);
        this.bfbox3.appendChild(this.button3);
        this.bfbox3.appendChild(this.des3);
        this.bfbox4.appendChild(this.button4);
        this.bfbox4.appendChild(this.des4);
        this.bfbox5.appendChild(this.button5);
        this.bfbox5.appendChild(this.des5);

        this.div.appendChild(this.title);
        this.div.appendChild(this.bfbox1);
        this.div.appendChild(this.bfbox2);
        this.div.appendChild(this.bfbox3);
        this.div.appendChild(this.bfbox4);
        this.div.appendChild(this.bfbox5);
        
        this.div.className = "splan-container";
        this.div.style.display = "none";

        return this.div;
    },

    showPlan: function(player) {

        schoolTodoList.cplayer = player;

        if (schoolTodoList.cplayer.round > 2 && schoolTodoList.cplayer.semester === 8 && !jobpageDone) {
            if (flagQiuzhi) {
                //跳转特殊事件找工作界面
                schoolTodoList.div.style.display = "none";
                jobpageDone = true;
                specialEventList.showDiv(player);
                return;
            }
        }

        
        //每学期可以做三次规划。拟通过player的属性控制
        if (schoolTodoList.cplayer.round > 2) {
            schoolTodoList.cplayer.round = 0;
            schoolTodoList.div.style.display = "none";
            transPage.showDiv();
            return;
        }

        //做完第一次规划后，进入特殊事件环节
        if (schoolTodoList.cplayer.round === 1 && !specialDone) {
            schoolTodoList.div.style.display = "none";
            specialEventList.showDiv(player);
            return;
        }

        testEnd(schoolTodoList.cplayer);

        schoolTodoList.button1.disabled = false;
        schoolTodoList.button2.disabled = false;
        schoolTodoList.button3.disabled = false;
        schoolTodoList.button4.disabled = false;
        schoolTodoList.button5.disabled = false;

        schoolTodoList.title.textContent = "接下来要做什么？（本学期第" + (schoolTodoList.cplayer.round + 1).toString() + "/3次规划）"; 

        schoolTodoList.div.style.display = "flex";

        schoolTodoList.cplans = schoolTodoList.getPlans();

        schoolTodoList.button1.textContent = schoolTodoList.cplans[0].text;
        schoolTodoList.des1.textContent = schoolTodoList.cplans[0].description;
        schoolTodoList.button2.textContent = schoolTodoList.cplans[1].text;
        schoolTodoList.des2.textContent = schoolTodoList.cplans[1].description;
        schoolTodoList.button3.textContent = schoolTodoList.cplans[2].text;
        schoolTodoList.des3.textContent = schoolTodoList.cplans[2].description;
        schoolTodoList.button4.textContent = schoolTodoList.cplans[3].text;
        schoolTodoList.des4.textContent = schoolTodoList.cplans[3].description;
        schoolTodoList.button5.textContent = schoolTodoList.cplans[4].text;
        schoolTodoList.des5.textContent = schoolTodoList.cplans[4].description;

        if (schoolTodoList.cplans === zeroStrengthPlans) {
            schoolTodoList.button2.disabled = true;
            schoolTodoList.button3.disabled = true;
            schoolTodoList.button4.disabled = true;
            schoolTodoList.button5.disabled = true;       

            schoolTodoList.des2.textContent = "没有体力了，啥都干不动。";
            schoolTodoList.des3.textContent = "没有体力了，啥都干不动。";
            schoolTodoList.des4.textContent = "没有体力了，啥都干不动。";
            schoolTodoList.des5.textContent = "没有体力了，啥都干不动。";    
        }

        if (schoolTodoList.cplans === zeroMoneyPlans) {
            schoolTodoList.button2.disabled = true;
            schoolTodoList.button3.disabled = true;
            schoolTodoList.button4.disabled = true;
            schoolTodoList.button5.disabled = true;  

            schoolTodoList.des2.textContent = "赚钱要紧";
            schoolTodoList.des3.textContent = "赚钱要紧";
            schoolTodoList.des4.textContent = "赚钱要紧";
            schoolTodoList.des5.textContent = "赚钱要紧";    
        }

        //对大四上、大四下规划的特殊处理
        if (schoolTodoList.cplans === DaSiShangSplanList) {
            if (schoolTodoList.cplayer.money < 5000) {
                schoolTodoList.button4.disabled = true;
                schoolTodoList.button5.disabled = true;
                schoolTodoList.des4.textContent = "你钱够吗？";
                schoolTodoList.des5.textContent = "你钱够吗？";
            }
            if (schoolTodoList.cplayer.money < 2000) {
                schoolTodoList.button3.disabled = true;
                schoolTodoList.des3.textContent = "你钱够吗？";
            }
        }

        if (schoolTodoList.cplans === DaSiXiaSplanList) {
            if (schoolTodoList.cplayer.money < 20000) {
                schoolTodoList.button5.disabled = true;
                schoolTodoList.des5.textContent = "你钱够吗？";
            }
            if (schoolTodoList.cplayer.money < 5000) {
                schoolTodoList.button4.disabled = true;
                schoolTodoList.des4.textContent = "你钱够吗？";
            }
            if (schoolTodoList.cplayer.money < 2000) {
                schoolTodoList.button3.disabled = true;
                schoolTodoList.des3.textContent = "你钱够吗？";
            }
        }
                
    },

    updateAttrB1: function() {
        (schoolTodoList.cplans[0]).updateAttr(schoolTodoList.cplayer);
        statusBanner.updateDiv(schoolTodoList.cplayer);
        schoolTodoList.cplayer.round++;
        schoolTodoList.showPlan(schoolTodoList.cplayer);        
    },

    updateAttrB2: function() {
        (schoolTodoList.cplans[1]).updateAttr(schoolTodoList.cplayer);
        statusBanner.updateDiv(schoolTodoList.cplayer);
        schoolTodoList.cplayer.round++;
        schoolTodoList.showPlan(schoolTodoList.cplayer);        
    },

    updateAttrB3: function() {
        (schoolTodoList.cplans[2]).updateAttr(schoolTodoList.cplayer);
        statusBanner.updateDiv(schoolTodoList.cplayer);
        schoolTodoList.cplayer.round++;
        schoolTodoList.showPlan(schoolTodoList.cplayer);        
    },

    updateAttrB4: function() {
        (schoolTodoList.cplans[3]).updateAttr(schoolTodoList.cplayer);
        statusBanner.updateDiv(schoolTodoList.cplayer);
        schoolTodoList.cplayer.round++;
        schoolTodoList.showPlan(schoolTodoList.cplayer);        
    },

    updateAttrB5: function() {
        (schoolTodoList.cplans[4]).updateAttr(schoolTodoList.cplayer);
        statusBanner.updateDiv(schoolTodoList.cplayer);
        schoolTodoList.cplayer.round++;
        schoolTodoList.showPlan(schoolTodoList.cplayer);        
    },

    getPlans: function() {
        
        let chosenPlans = [];

        if (this.cplayer.horizon > HORIZON_EX_LIMIT && this.cplayer.money >= MONEY_EX_LIMIT) {
            let npm = selectRandomPlans(middleSplanList, 2);
            let nph = selectRandomPlans(highSplanList, 2);
            let npex = selectRandomPlans(exSplanList, 1);

            npm.forEach(function(element) {
                chosenPlans.push(element);
            });
            nph.forEach(function(element) {
                chosenPlans.push(element);
            });
            chosenPlans.push(npex[0]);
        } else if (this.cplayer.horizon > HORIZON_H_LIMIT && this.cplayer.money >= MONEY_H_LIMIT) {
            
            let npl = selectRandomPlans(lowSplanList, 2);
            let npm = selectRandomPlans(middleSplanList, 2);
            let nph = selectRandomPlans(highSplanList, 1);

            npl.forEach(function(element) {
                chosenPlans.push(element);
            });
            npm.forEach(function(element) {
                chosenPlans.push(element);
            });
            chosenPlans.push(nph[0]);
        } else if (this.cplayer.horizon > HORIZON_M_LIMIT && this.cplayer.money >= MONEY_M_LIMIT) {

            let npl = selectRandomPlans(lowSplanList, 3);
            let npm = selectRandomPlans(middleSplanList, 2);

            npl.forEach(function(element) {
                chosenPlans.push(element);
            });
            npm.forEach(function(element) {
                chosenPlans.push(element);
            });
        } else {
            let npl = selectRandomPlans(lowSplanList, 4);
            let npm = selectRandomPlans(middleSplanList, 1);

            npl.forEach(function(element) {
                chosenPlans.push(element);
            });
            chosenPlans.push(npm[0]);
        }

        if (this.cplayer.strength <= 0) {
            return zeroStrengthPlans;
        }

        if (this.cplayer.money <= 0) {
            return zeroMoneyPlans;
        }

        if (this.cplayer.semester === 7) {
            return DaSiShangSplanList;
        }

        if (this.cplayer.semester === 8) {
            return DaSiXiaSplanList;
        }

        return chosenPlans;
    }
}
//期末考试成绩界面
const examReport = {
    title: document.createElement("h3"),
    subtitle: document.createElement("h4"),
    para1: document.createElement("p"),
    para2: document.createElement("p"),
    para3: document.createElement("p"),
    para4: document.createElement("p"),
    submit: document.createElement("button"),
    div: document.createElement("div"),
    text1: "本学期，你选修了",
    text2: "门课。成绩分别为：",
    text3: "你通过了",
    text4: "门课，挂了",
    text5: "门课。",
    text6: "你本学期的绩点为：",
    textTBD: "--",
    cplayer: null,
    
    createDiv: function (player) {
        //初始化
        this.cplayer = player;
        this.title.textContent = "期末考试成绩单";
        this.subtitle.textContent = "大一上学期";
        this.para1.textContent = this.text1 + this.textTBD + this.text2;
        this.para2.textContent = this.textTBD;
        this.para3.textContent = this.text3 + this.textTBD + this.text4 + this.textTBD + this.text5;
        this.para4.textContent = this.text6 + this.textTBD;
        this.submit.textContent = "收到";
        this.submit.onclick = () => {
            this.div.style.display = "none";
            //先处理游戏结束的情况
            if (player.semester === 8) {
                if (flagXuewei) {
                    //双证齐全的情况
                    //按结局从好到坏依次判定
                    if (flagGongzuo3 && flagKaoYan3) {
                        setGameover(examReport.cplayer, PERFECT_END);
                    } else if (flagGongzuo3) {
                        setGameover(examReport.cplayer, GONGZUO3_END);
                    } else if (flagKaoYan3) {
                        setGameover(examReport.cplayer, KAOYAN_END);
                    } else if (flagKaoYan2) {
                        setGameover(examReport.cplayer, KAOYAN_END);
                    } else if (flagGongzuo2) {
                        setGameover(examReport.cplayer, GONGZUO2_END);
                    } else if (flagKaoYan1 && flagKaoshangYan) {
                        setGameover(examReport.cplayer, KAOYAN_END);
                    } else if (!flagGongzuo1) {
                        setGameover(examReport.cplayer, BIYE_SHIYE_END);
                    } else {
                        setGameover(examReport.cplayer, GONGZUO1_END);
                    }
                } else if (flagDanbiye) {
                    //单证。按结局从好到坏依次判定
                    if (flagGongzuo1) {
                        setGameover(examReport.cplayer, GONGZUO1_END);
                    } else {
                        setGameover(examReport.cplayer, DANBIYE_END);
                    }
                } else {
                    //结业
                    setGameover(examReport.cplayer, JIEYE_END);
                }
                return;
            }
            setVacationPage(this.cplayer, globalVocDivPointer);
        }
        this.div.appendChild(this.title);
        this.div.appendChild(this.subtitle);
        this.div.appendChild(this.para1);
        this.div.appendChild(this.para2);
        this.div.appendChild(this.para3);
        this.div.appendChild(this.para4);
        this.div.appendChild(this.submit);

        this.div.style.display = "none";
        this.div.className = "exam-container";
        this.title.className = "exam-title";
        this.subtitle.className = "exam-subtitle";
        this.para1.className = "exam-para";
        this.para2.className = "exam-para";
        this.para3.className = "exam-para";
        this.para4.className = "exam-para";
        this.submit.className = "exam-button";
        return this.div;
    },

    showGraduateDiv: function(player) {
        examReport.title.textContent = "毕业答辩";
        examReport.subtitle.textContent = "大四下学期";
        if (numFailedExam < 5) {
            examReport.para1.textContent = "毕业答辩满分100分。经专家讨论，你的得分是：";
            let sc = calLunwen(player);
            examReport.para2.textContent = sc.toString();
            if (sc < 60) {
                flagDanbiye = true;  //毕业证单证
                examReport.para3.textContent = "没通过毕业答辩，拿不到学位证！";
                if (flagKaoshangYan || flagGongzuo3 || flagGongzuo2 && !flagGongzuo1) {
                    this.para4.textContent = "没有学位证，考研、找工作的事也黄了……";
                } else if (flagGongzuo1) {
                    this.para4.textContent = "黑作坊老板答应你，没有学位证也能去上班。真是不幸中的万幸。";
                } else {
                    this.para4.textContent = "转念一想，你既没考上研究生，也没找到工作。拿不到学位证对你没任何影响。你释然了。";
                } 
            } else {
                flagXuewei = true;   //毕业证+学位证
                examReport.para3.textContent = "答辩委员会同意授予你学士学位。";
                if (flagKaoshangYan || flagGongzuo3 || flagGongzuo2) {
                    this.para4.textContent = "前途一片光明！";
                } else if (flagGongzuo1) {
                    this.para4.textContent = "收拾收拾去当牛马吧。";
                } else {
                    this.para4.textContent = "毕业即失业，但好歹毕业证学位证都拿到手了。";
                }
            }
        } else {
            flagJieye = true;   //结业证
            examReport.para1.textContent = "你惊奇地发现，答辩名单上没你名字！";
            examReport.para2.textContent = "你打电话问辅导员，才知道自己因为挂科太多，根本就没进入答辩流程。";
            examReport.para3.textContent = "事后，你拿到了结业证书";
            if (flagKaoshangYan || flagGongzuo3 || flagGongzuo2) {
                this.para4.textContent = "只拿到结业证，考上的研、找到的工作都黄了。";
            } else if (flagGongzuo1) {
                this.para4.textContent = "好在黑作坊老板不挑，只有结业证也能去当牛马。";
            } else {
                this.para4.textContent = "好在你本来就一事无成，毕不毕业都一样。";
            }
        }
        this.div.style.display = "flex";
    },

    updateDiv: function (player) {
        //最后一学期是毕业论文
        if (player.semester === 8) {
            examReport.showGraduateDiv(player);
            return;
        }
        
        //计算期末考试成绩
        //先查询玩家上的哪所大学。rank与大学一一对应，用rank查。
        let univ = univList.find(un => un.rank === player.univRank);
        //再计算期末考多少门课、考试基础难度。和专业、年级有关。
        let exNum = 0;
        let exbase = player.examBase;
        switch (player.major) {
            case ART_MAJOR: {
                exNum = ART_NUM;
                exbase += ART_DIFF;
                break;
            }
            case SOCIAL_MAJOR: {
                exNum = SOCIAL_NUM;
                exbase += SOCIAL_DIFF;
                break;
            }
            case ENGINEER_MAJOR: {
                exNum = ENGINEER_NUM;
                exbase += ENGINEER_DIFF;
                break;
            }
            case SCIENCE_MAJOR: {
                exNum = SCIENCE_NUM;
                exbase += SCIENCE_DIFF;
            }
        }

        //大二、大三时，多加一门课
        if (player.year === 2 || player.year === 3) {
            exNum++;
        }
        //一年增加两点智力的情况下，对考试下限修正是+10。
        if (player.univRank <= 4) {
            exbase -= (player.year - 1) * 20;
        } else if (player.univRank <= 8) {
            exbase -= (player.year - 1) * 15;
        } else {
            exbase -= (player.year - 1) * 10;
        }
        //通关特典加成
        if(flagJuanWang) {
            exbase += 30;
        }
        //为方便后续补考程序，将更新后的exbase再传回去
        player.examBase = exbase;
        let score = calFinalExam(player.intelligence, exbase, univ, exNum, player.luck);
        //score是一个数组。数组元素是0-100的数，代表每门课考多少分；数组长度是考试门数。
        let gpa = calExamGPA(score);
        //该函数接受一个以0-100计分的数组，计算每门课绩点，再返回一个0-400的数表示平均绩点。
        let cNum = score.length;
        switch (player.year) {
            case 1: {
                this.subtitle.textContent = "大一";
                break;
            }
            case 2: {
                this.subtitle.textContent = "大二";
                break;
            }
            case 3: {
                this.subtitle.textContent = "大三";
                break;
            }
            case 4: {
                this.subtitle.textContent = "大四";
                break;
            }
        };
        if (player.semester % 2 === 0) {
            this.subtitle.textContent += "下学期";
        } else {
            this.subtitle.textContent += "上学期";
        };
        let sText = "";

        for (let i = 0; i < cNum; i++) {
            //百分制成绩换算成各等级
            if (score[i] >= ALLimit) {
                sText += "A";
            } else if (score[i] >= AminusLLimit) {
                sText += "A-";
            } else if (score[i] >= BplusLLimit) {
                sText += "B+";
            } else if (score[i] >= BLLimit) {
                sText += "B";
            } else if (score[i] >= BminusLLimit) {
                sText += "B-";
            } else if (score[i] >= CplusLLimit) {
                sText += "C+";
            } else if (score[i] >= CLLimit) {
                sText += "C";
            } else if (score[i] >= CminusLLimit) {
                sText += "C-";
            } else if (score[i] >= DLLimit) {
                sText += "D";
            } else {
                sText += "F";
            }
            if (i < score.length-1) {
                sText += "，";
            } else {
                sText += "。";
            }
        };

        let pCourse = score.filter(element => element >= 60);
        let pNum = pCourse.length;
        let fCourse = score.filter(element => element < 60);
        let fNum = fCourse.length;
        let sgpa = (0.01 * gpa).toFixed(2);

        numCurrentFail = fNum;
        let gpaarray = score2GPA(score);        
        for (let i = 0; i < score.length; i++) {
            totalGPAArray.push(gpaarray[i]);
        }
        let tgpa = gpaArray2GPA(totalGPAArray);  //之前学期总绩点
        this.para1.textContent = this.text1 + cNum.toString() + this.text2;
        this.para2.textContent = sText;
        this.para3.textContent = this.text3 + pNum.toString() + this.text4 + fNum.toString() + this.text5;
        this.para4.textContent = this.text6 + sgpa.toString();
        gradeReport.updateDiv(gpa, tgpa, player.major, pNum);
        player.cgpa = gpa;
        player.tgpa = tgpa;
        this.div.style.display = "flex";
    }
}
//挂科补考栏
const examResit = {
    title: document.createElement("h3"),
    div1: document.createElement("div"),
    div2: document.createElement("div"),
    div3: document.createElement("div"),
    button: document.createElement("button"),
    div: document.createElement("div"),
    done: false,  //表示补考前、补考后
    cplayer: null,

    createDiv: function(player) {
        this.cplayer = player;
        this.div1.innerHTML = "";
        this.div2.innerHTML = "";
        this.div3.innerHTML = "";
        this.title.textContent = "开学补考";
        this.button.textContent = "点我开始补考";

        this.button.onclick = () => {
            //补考后
            if (examResit.done) {
                examResit.done = false;
                examResit.button.textContent = "点我开始补考";
                examResit.div1.innerHTML = "";
                examResit.div2.innerHTML = "";
                examResit.div3.innerHTML = "";
                examResit.div.style.display = "none";
                //跳转到学期规划界面。因为这是新学期的开头，所以学年、学期等数据不在此变更。
                examResit.cplayer.examBase = 0;
                schoolTodoList.showPlan(examResit.cplayer);
                return;
            }
            //补考前
            let exnum = numCurrentFail;
            numCurrentFail = 0;
            let exbase = examResit.cplayer.examBase;
            exbase += 5;
            examResit.cplayer.examBase = 0;
            let univ = univList.find(un => un.rank === (examResit.cplayer).univRank);
            let inte = examResit.cplayer.intelligence;
            let luck = examResit.cplayer.luck;

            let score = calFinalExam(inte, exbase, univ, exnum, luck); 
            let pCourse = score.filter(element => element >= 60);
            let pNum = pCourse.length;
            let fCourse = score.filter(element => element < 60);
            let fNum = fCourse.length;

            examResit.div2.textContent = pNum.toString() + "门课补考后合格，成绩记录变更为“D-”。";
            if (fNum > 0) {
                examResit.div2.textContent += fNum.toString() + "门课仍然不合格，维持“F”的记录。";
            };

            //更新成绩记录
            let j = 0;
            for (let i = 0; i < totalGPAArray.length; i++) {
                if (j >= pNum) {
                    break;
                }
                //补考通过pNum门课，将成绩记录里pNum门不合格的课改为补考合格
                if (totalGPAArray[i] === 0) {
                    totalGPAArray[i] = 100;  // 补考合格D-对应绩点1.00
                    j++;
                }
            }

            let tgpa = gpaArray2GPA(totalGPAArray);

            //处理挂科的学业警告
            if (fNum > 0) {
                //第一次挂科
                if (numFailedExam === 0) {
                    gradeReport.appendWarning("挂科了，失去保研资格！");
                } else if (numFailedExam < 2 && numFailedExam + fNum >= 2) {
                    //第一次触发学业预警
                    gradeReport.appendWarning("你挂了超过两门课，触发学业预警。挂五门课即退学，务必端正学习态度。");
                }
                numFailedExam += fNum;
                if (numFailedExam >= 5) {
                    //挂科太多，直接结束游戏
                    setGameover(examResit.cplayer, GUAKE_END);
                }
            }

            gradeReport.updateDiv (TBDGPA, tgpa, player.major, pNum);
            examResit.div3.textContent = "总成绩单已更新，请自行查看。"
            examResit.button.textContent = "知道了";
            examResit.done = true;
        }

        this.div.appendChild(this.title);
        this.div.appendChild(this.div1);
        this.div.appendChild(this.div2);
        this.div.appendChild(this.div3);
        this.div.appendChild(this.button);
        this.div.className = "resit-container";
        this.title.className = "resit-title";
        this.div1.className = "resit-div";
        this.div2.className = "resit-div";
        this.div3.className = "resit-div";
        this.button.className = "resit-button";

        examResit.div.style.display = "none";
        return this.div;

    },

    updateDiv: function () {
        //补考时已进入新学期
        let exnum = numCurrentFail;
        this.div1.textContent = "你上学期挂了" + exnum.toString() + "门课。"
        examResit.div.style.display = "flex";
    }
    
    
}
//学年总结
const yearReport = {
    title: document.createElement("h3"),
    div1: document.createElement("div"),
    div2: document.createElement("div"),
    div3: document.createElement("div"),
    div4: document.createElement("div"),
    button: document.createElement("button"),
    div: document.createElement("div"),
    cplayer: null,

    createDiv: function(player) {
        this.cplayer = player;
        this.title.textContent = "学年总结";
        this.button.textContent = "开启新学年";
        this.div.appendChild(this.title);
        this.div.appendChild(this.div1);
        this.div.appendChild(this.div2);
        this.div.appendChild(this.div3);
        this.div.appendChild(this.div4);
        this.div.appendChild(this.button);
        this.div.style.display = "none";

        this.button.onclick = () => {
            yearReport.cplayer.year++;
            yearReport.cplayer.semester++;
            gradeReport.updateDiv(TBDGPA, yearReport.cplayer.tgpa,yearReport.cplayer.major, 0);
            titleBanner.updateDiv(yearReport.cplayer);
            yearReport.div.style.display = "none";
            if (numCurrentFail > 0) {
                examResit.updateDiv();
            } else {
                yearReport.cplayer.examBase = 0;
                schoolTodoList.showPlan(yearReport.cplayer);
            }
        }
        this.div.className = "yearr-container";
        this.title.className = "yearr-title";
        this.div1.className = "yearr-div";
        this.div2.className = "yearr-div";
        this.div3.className = "yearr-div";
        this.div4.className = "yearr-div";
        this.button.className = "yearr-button";

        return this.div;
    },

    updateDiv: function() {
        //此函数同时更新各项数据
        let univ = univList.find(un => un.rank === (yearReport.cplayer).univRank);
        //计算学校给玩家的年度加成
        univ.update(yearReport.cplayer);
        yearReport.div1.textContent = "一年过去，增长了不少知识。（基础属性提升。）";

        //计算收支
        let fac = yearReport.cplayer.finance;  //财商提供的收入系数
        if (fac > 50) {
            fac = 50;
        }
        if (fac < 0) {
            fac = 0;
        }

        //财商提供的理财收入
        let fmoney = Math.floor(0.01 * fac * yearReport.cplayer.money);
        fmoney += fac * 500;

        //家里给的生活费
        let wmoney = yearReport.cplayer.wealth * yearReport.cplayer.wealth * 100;

        let income = fmoney + wmoney - univ.fee;

        this.div2.textContent = "被动理财收入" + fmoney.toString() + "元（与财商、现有资金相关），家里给的生活费" + wmoney.toString() + "元（与家境有关），学费" + univ.fee.toString() + "元。"; 
        this.div3.textContent = "净收支" + income.toString() + "元。";

        yearReport.cplayer.money += income;

        this.div4.textContent = "明年也要继续努力。";

        statusBanner.updateDiv(yearReport.cplayer);
        yearReport.div.style.display = "flex";

    }
}
//过渡界面
const tranKeyframes = [
    {transform: "rotate(0) scale(1)"},
    {transform: "rotate(360deg) scale(0)"},
];
const tranParams = {
    duration: 1000,
    iteration: 1,
};
const transPage = {
    rotDiv: document.createElement("div"),
    text1: document.createElement("div"),
    text2: document.createElement("div"),
    cplayer: null,  //用来传参
    isrunning: false,  //避免动画出错

    createDiv: function(player) {
        let div = document.createElement("div");
        this.text1.textContent = "11";
        this.text2.textContent = "22";
        this.text1.className = "trans-text";
        this.text2.className = "trans-text";
        this.rotDiv.appendChild(this.text1);
        this.rotDiv.appendChild(this.text2);
        this.rotDiv.addEventListener("click", transPage.rotate);
        div.appendChild(this.rotDiv);
        this.rotDiv.className = "trans-container";
        this.rotDiv.style.display = "none";
        this.cplayer = player;
        this.isrunning = false;
        return div;
    },

    showDiv: function () {
        this.text1.textContent = "考试周到了";
        this.text2.textContent = "点我开始期末考试";
        this.rotDiv.style.display = "flex";
        //最后一学期写毕业论文，不上课。
        if (transPage.cplayer.semester === 8) {
            this.text1.textContent = "终于写完毕业论文了";
            this.text2.textContent = "点我开始毕业答辩";
        }
    },

    rotate: function() {
        if (transPage.isrunning) {
            return;
        }
        transPage.isrunning = true;
        transPage.rotDiv.animate(tranKeyframes, tranParams).finished.then(() => {
            //等动画结束后，执行后续操作
            transPage.rotDiv.style.display = "none"; //隐藏本页面
            transPage.isrunning = false;
            if (transPage.cplayer.semester === 8) {
                examReport.showGraduateDiv(transPage.cplayer);
                return;
            }
            examReport.updateDiv(transPage.cplayer);
        }); 
    }
}


//总成绩单
const gradeReport = {
    title: document.createElement("h3"),
    currentGPA: document.createElement("p"), //本学期GPA
    totalGPA: document.createElement("p"), //总GPA
    failCourse: document.createElement("p"), //挂科数
    passCourse: document.createElement("p"), //已修课程数
    gradeWarning: document.createElement("div"), //相关警告

    currentGPAText1: "本学期绩点：",
    currentGPANum: 0,
    totalGPAText1: "总学分绩：",
    totalGPANum: 0,
    failCourseText1: "挂科数：",
    failCourseNum: 0,
    passCourseText1: "已通过课程数：",
    passCourseNum: 0,
    textTBD: "--",

    createDiv: function(major) {
        this.title.textContent = "成绩单";

        //考虑到多周目游戏里，相关值可能被改变。调用该函数初始化时，应将相关值置零。
        this.currentGPANum = 0;
        this.totalGPANum = 0;
        this.failCourseNum = 0;
        this.passCourseNum = 0;
        this.gradeWarning.innerHTML = "";

        this.currentGPA.textContent = this.currentGPAText1 + this.textTBD;
        this.totalGPA.textContent = this.totalGPAText1 + this.textTBD;
        this.failCourse.textContent = this.failCourseText1 + this.failCourseNum.toString();
        this.passCourse.textContent = this.passCourseText1 + this.passCourseNum.toString();

        switch (major) {
            case artMajorCode: {
                this.passCourse.textContent += ("/" + artTotalCourseNum.toString());  
                break;
            }
            case socialMajorCode: {
                this.passCourse.textContent += ("/" + socialTotalCourseNum.toString());
                break;
            }
            case engineerMajorCode: {
                this.passCourse.textContent += ("/" + engineerTotalCourseNum.toString());
                break;
            }
            case scienceMajorCode: {
                this.passCourse.textContent += ("/" + scienceTotalCourseNum.toString());
                break;
            }
            default:
                break;
        };

        let div = document.createElement("div");
        div.appendChild(this.title);
        div.appendChild(this.currentGPA);
        div.appendChild(this.totalGPA);
        div.appendChild(this.failCourse);
        div.appendChild(this.passCourse);
        div.appendChild(this.gradeWarning);
        div.className = "sidebar";
        return div;
    },

    updateDiv: function(cGPA, tGPA, major, pnum) {
        //cGPA表示当前学期GPA
        //tGPA表示总GPA
        this.currentGPA.textContent = this.currentGPAText1 + ((0.01 * cGPA).toFixed(2)).toString() + "/4.00";
        this.totalGPA.textContent = this.totalGPAText1 + ((0.01 * tGPA).toFixed(2)).toString() + "/4.00";
        this.failCourse.textContent = this.failCourseText1 + (numCurrentFail + numFailedExam).toString();
        gradeReport.passCourseNum += pnum;
        this.passCourse.textContent = this.passCourseText1 + (this.passCourseNum).toString(); 

        if (cGPA === TBDGPA) {
            this.currentGPA.textContent = this.currentGPAText1 + this.textTBD;
        }

        switch (major) {
            case artMajorCode: {
                this.passCourse.textContent += ("/" + artTotalCourseNum.toString());  
                break;
            }
            case socialMajorCode: {
                this.passCourse.textContent += ("/" + socialTotalCourseNum.toString());
                break;
            }
            case engineerMajorCode: {
                this.passCourse.textContent += ("/" + engineerTotalCourseNum.toString());
                break;
            }
            case scienceMajorCode: {
                this.passCourse.textContent += ("/" + scienceTotalCourseNum.toString());
                break;
            }
            default:
                break;
        };

    },

    appendWarning: function(msg) {
        //学业警告信息
        let p = document.createElement("p");
        p.textContent = msg;
        this.gradeWarning.appendChild(p);
    }

}

