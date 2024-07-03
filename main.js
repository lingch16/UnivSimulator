//选专业界面
function setMajorPage(player) {
    
    //清空之前的页面
    document.body.innerHTML = "";
    //document.body.innerHTML = githubCorner;
    
    let title = document.createElement("h2");
    title.textContent = "选择一个喜欢的专业吧：";

    let majorTDiv = document.createElement("div");
    majorTDiv.appendChild(title);



    let optionArt = document.createElement("input");
    let optionSoc = document.createElement("input");
    let optionEng = document.createElement("input");
    let optionSci = document.createElement("input");
	let optionMed = document.createElement("input");
    let labelArt = document.createElement("label");
    let labelSoc = document.createElement("label");
    let labelEng = document.createElement("label");
    let labelSci = document.createElement("label");
	let labelMed = document.createElement("label");

    optionArt.type = "radio";
    optionArt.name = "majorChoose";
    optionArt.id = "choiceArt";
    optionArt.value = "art";

    optionSoc.type = "radio";
    optionSoc.name = "majorChoose";
    optionSoc.id = "choiceSoc";
    optionSoc.value = "soc";

    optionEng.type = "radio";
    optionEng.name = "majorChoose";
    optionEng.id = "choiceEng";
    optionEng.value = "eng";

    optionSci.type = "radio";
    optionSci.name = "majorChoose";
    optionSci.id = "choiceSci";
    optionSci.value = "sci";
	
	optionMed.type = "radio";
    optionMed.name = "majorChoose";
    optionMed.id = "choiceMed";
    optionMed.value = "med";

    labelArt.htmlFor = optionArt.id;
    labelSoc.htmlFor = optionSoc.id;
    labelEng.htmlFor = optionEng.id;
    labelSci.htmlFor = optionSci.id;
	labelMed.htmlFor = optionMed.id;

    labelArt.textContent = "纯文科（期末考试简单）";
    labelSoc.textContent = "经管法等社科类（比较均衡）";
    labelEng.textContent = "新工科类专业（好找工作）";
    labelSci.textContent = "基础科学（更容易保研）";
	labelMed.textContent = "医科专业（最难毕业的）";

    let majorGroupDiv = document.createElement("div");
    
    let majorItemDiv1 = document.createElement("div");
    let majorItemDiv2 = document.createElement("div");
    let majorItemDiv3 = document.createElement("div");
    let majorItemDiv4 = document.createElement("div");
	let majorItemDiv5 = document.createElement("div");

    majorItemDiv1.appendChild(optionArt);
    majorItemDiv1.appendChild(labelArt);

    majorItemDiv2.appendChild(optionSoc);
    majorItemDiv2.appendChild(labelSoc);

    majorItemDiv3.appendChild(optionEng);
    majorItemDiv3.appendChild(labelEng);

    majorItemDiv4.appendChild(optionSci);
    majorItemDiv4.appendChild(labelSci);

    majorItemDiv5.appendChild(optionMed);
    majorItemDiv5.appendChild(labelMed);
	
    let submit = document.createElement("button");
    submit.textContent = "确定";

    majorTDiv.className = "major-title";

    majorGroupDiv.className = "major-rgroup";
    
    majorItemDiv1.className = "major-ritem";
    majorItemDiv2.className = "major-ritem";
    majorItemDiv3.className = "major-ritem";
    majorItemDiv4.className = "major-ritem";
	majorItemDiv5.className = "major-ritem";

    majorGroupDiv.appendChild(majorItemDiv1);
    majorGroupDiv.appendChild(majorItemDiv2);
    majorGroupDiv.appendChild(majorItemDiv3);
    majorGroupDiv.appendChild(majorItemDiv4);
	majorGroupDiv.appendChild(majorItemDiv5);

    submit.className = "major-button";

    let majorPageDiv = document.createElement("div");
    majorPageDiv.appendChild(majorTDiv);
    majorPageDiv.appendChild(majorGroupDiv);
    majorPageDiv.appendChild(submit);
    majorPageDiv.className = "major-page";

    submit.onclick = () => {

        let choice = document.querySelector('input[name="majorChoose"]:checked');
        
        if (!choice) {
            alert("请选择一个选项");
            return;
        }
        
        switch(choice.value) {
            case optionArt.value: {
                player.major = artMajorCode;
                break;
            }
            case optionSoc.value: {
                player.major = socialMajorCode;
                break;
            }
            case optionEng.value: {
                player.major = engineerMajorCode;
                break;
            }
            case optionSci.value: {
                player.major = scienceMajorCode;
                break;
            }
			case optionMed.value: {
                player.major = medicalMajorCode;
                break;
            }
        }
        optionArt = null;
        optionSoc = null;
        optionEng = null;
        optionSci = null;
		optionMed = null;
        labelArt = null;
        labelSoc = null;
        labelEng = null;
        labelSci = null;
		labelMed = null;
        submit = null;
        div = null;
        setCollegeApplyPage(player);
    };

    document.body.appendChild(majorPageDiv);

}

//主程序
function setUnivGame(my) {
    //页面布局
    let mainDiv = document.createElement("div");

    
    let mainTitle = titleBanner.createDiv();     //最上方的标题
        
    let statusDiv = statusBanner.createDiv(my);   //上方的状态栏，显示体力、心情、精力、金钱
    
    let eventDiv = eventRecord.createDiv();  //重要事件列表，靠左显示
    
    let centerContainer = document.createElement("div"); //中间的显示界面
    
    let schoolPlanDiv = schoolTodoList.createDiv();  //学期规划栏
    let specialeventDiv = specialEventList.createDiv(my);  //特殊事件栏
    let examContainer = examReport.createDiv(my);  //期末考试成绩显示栏
    let transDiv = transPage.createDiv(my); //转场动画页
    globalVocDivPointer = document.createElement("div"); //假期事件栏
    let examresitDiv = examResit.createDiv(my); //挂科开学补考页
    let yearrDiv = yearReport.createDiv(my);  //学年总结页
    
    centerContainer.appendChild(schoolPlanDiv);
    centerContainer.appendChild(specialeventDiv);
    centerContainer.appendChild(examContainer);
    centerContainer.appendChild(transDiv);
    centerContainer.appendChild(globalVocDivPointer);
    centerContainer.appendChild(examresitDiv);
    centerContainer.appendChild(yearrDiv);
    centerContainer.className = "ccontainer";
        
    let gradeDiv = gradeReport.createDiv(my.major); //总成绩单，靠右侧显示

    let bigContainer = document.createElement("div"); //标题、状态栏下面的全部
    bigContainer.className = "bcontainer";
    bigContainer.appendChild(eventDiv);
    bigContainer.appendChild(centerContainer);
    bigContainer.appendChild(gradeDiv);
    
    
    mainDiv.appendChild(mainTitle);
    mainDiv.appendChild(statusDiv);
    mainDiv.appendChild(bigContainer);
	
    document.body.appendChild(mainDiv);
    
    
    my.year = 1;
    my.semester = 1;
    
    //更新页面设置

    titleBanner.updateDiv(my);
    schoolTodoList.showPlan(my);




}

//录取通知书页
function setAdmissionLetterPage(collegeRank, player) {

    let title = document.createElement("h2");
    let text = document.createElement("h3");
    let college = univList.find((univ) => univ.rank === collegeRank);

    if (collegeRank < rankexUniv.rank) {
        title.textContent = "恭喜！";
    } else {
        title.textContent = "你滑档了！";
    }
    text.textContent = "你被" + college.name +"录取了";

    let admissionDiv = document.createElement("div");
    admissionDiv.className = "admission-page";

    let atDiv = document.createElement("div");
    atDiv.className = "admission-title";
    let atxtDiv = document.createElement("div");
    atxtDiv.className = "admission-txt";

    atDiv.appendChild(title);
    atxtDiv.appendChild(text);

    let okButton = document.createElement("button");
    okButton.textContent = "点我开启大学生活";
    okButton.className = "admission-button";
    okButton.onclick = function () {
        
        document.body.removeChild(admissionDiv);
        admissionDiv = null;

        setUnivGame(player);
        
    }

    admissionDiv.appendChild(atDiv);
    admissionDiv.appendChild(atxtDiv);
    admissionDiv.appendChild(okButton);
    document.body.appendChild(admissionDiv);

}

//志愿填报页面
function setCollegeApplyPage(currentPlayer) {
    //删除之前页面
    document.body.innerHTML = "";
    //document.body.innerHTML = githubCorner;

    let collegeApplyDiv = document.createElement("div");
    collegeApplyDiv.className = "apply-page";
    let applyContainer = document.createElement("div");
    applyContainer.className = "apply-container";

    let title = document.createElement("h2");
    title.textContent = "志愿填报"
    title.className = "apply-title";

    let description1 = document.createElement("h3");
    description1.className = "apply-description";
    
    switch (currentPlayer.intelligence) {
        case 10: 
            description1.textContent = "你的高考位次：省状元";
            break;
        case 9:
            description1.textContent = "你的高考位次：市状元";
            break;
        case 8:
            description1.textContent = "你的高考位次：万里挑一";
            break;
        case 7:
            description1.textContent = "你的高考分：顶尖高校提档线";
            break;
        case 6:
            description1.textContent = "你的高考成绩：全校第一";
            break;
        case 5:
            description1.textContent = "你的高考位次：百里挑一";
            break;
        case 4:
            description1.textContent = "你的高考成绩：班级前十";
            break;
        case 3:
            description1.textContent = "你的高考成绩：中等偏上";
            break;
        case 2:
            description1.textContent = "你的高考分：只有平均分";
            break;
        case 1:
            description1.textContent = "你的高考分：勉勉强强";
            break;
        default:
            description1.textContent = "你的高考分：不大理想";
            break;
    }

    if (currentPlayer.intelligence > 10) {
        description1.textContent = "你的高考成绩：刷新历史记录";
    }


    let description2 = document.createElement("h3");
    description2.className = "apply-description";
    description2.textContent = "志愿规划师为你推荐了五所学校，按去年录取分数线从高到低的顺序，排列如下。请选择其中三所。"

    collegeApplyDiv.appendChild(title);
    collegeApplyDiv.appendChild(description1);
    collegeApplyDiv.appendChild(description2);

    //用随机生成的智商代替高考分数，作为填志愿的依据。填报成功失败与院校排名和智商有关。    
    let currentUnivList = [];
    if (currentPlayer.intelligence >= 6) {
        currentUnivList = [...goodUnivList];
    } else if (currentPlayer.intelligence >= 3) {
        currentUnivList = [...fairUnivList];
    } else {
        currentUnivList = [...poorUnivList];
    }


    let myCollege = [];
    let pass = [];

    //设置复选框
    let selectedunivnames = [];

    for(let i = 0; i < currentUnivList.length; i++) {
        let cdiv = document.createElement("div");
        let cdiv1 = document.createElement("div");
        let cdiv2 = document.createElement("div");
        cdiv.className = "apply-univcontainer";
        cdiv1.className = "apply-univname";
        cdiv2.className = "apply-univtext";
        cdiv1.textContent = currentUnivList[i].name;
        cdiv2.textContent = currentUnivList[i].text;
        cdiv.appendChild(cdiv1);
        cdiv.appendChild(cdiv2);
        applyContainer.appendChild(cdiv);
        cdiv.addEventListener("click", function () {
            if (this.classList.contains("done")) {
                let index = selectedunivnames.indexOf(cdiv1.textContent);
                if (index !== -1) {
                    selectedunivnames.splice(index, 1);
                }
                this.classList.toggle("done");
                return; 
            }
            if (selectedunivnames.length >= 3) {
                alert("最多选择三所学校");
                return;
            }
            this.classList.toggle("done");
            selectedunivnames.push(cdiv1.textContent);
        })
    }

   
    let submitButton = document.createElement("button");
    submitButton.textContent = "确定";
    submitButton.className = "apply-button";

    submitButton.onclick = () => {
        //获取选择项
        if (selectedunivnames.length < 3) {
            alert("请选择三所学校");
            return;
        }

        for (let i = 0; i < selectedunivnames.length; i++) {
            let uv = univList.find(element => element.name === selectedunivnames[i]);
            myCollege.push(uv);
        }
        if (myCollege.length === 3) {
            //依次检查是否被录取
            myCollege.sort(function(a,b) {
                return a.rank - b.rank
            });
            for(let j = 0; j < myCollege.length; j++) {
                let admissionProbability = currentPlayer.intelligence * 4 + myCollege[j].tier * 10 + myCollege[j].rank;
                let testNumber = getRandomInteger(0, 100);  //获取0到100间的随机数
                if (admissionProbability >= testNumber) {
                    pass.push(myCollege[j]);
                }
            }
            if (pass.length === 0) {
                currentPlayer.univRank = rankexUniv.rank;
            } else {
                currentPlayer.univRank = pass[0].rank;
            }
            //省、市状元不会滑档
            if (currentPlayer.intelligence >= 10) {
                currentPlayer.univRank = myCollege[0].rank;
            }
            if ((currentPlayer.intelligence === 9) && (currentPlayer.univRank !== myCollege[0].rank)) {
                currentPlayer.univRank = myCollege[1].rank;
            }
            document.body.removeChild(collegeApplyDiv);
            collegeApplyDiv = null;
            setAdmissionLetterPage(currentPlayer.univRank, currentPlayer);
        } else {
            myCollege = [];
            pass = [];
            alert("请选择三所学校");
            return;
        }
    }

    collegeApplyDiv.appendChild(applyContainer);
    collegeApplyDiv.appendChild(submitButton);
    document.body.appendChild(collegeApplyDiv);
}

window.onload = function() {
    let btn = document.getElementById('startButton');
    btn.disabled = false; 
    btn.textContent = '填志愿';
    btn.addEventListener("click", setGame);
};


//上大学前
function setGame() {
    // 初始化玩家信息。尚未实装的功能用TBD表示。
    //分别是 姓名、性别、家境、心情、体力、精力、智商、眼界、财商、幸运、风险、资金、年级、所上大学排名（初始值100）、专业代码（初始值0）、学期规划轮次（用于跟踪学期规划决断次数、期末考试成绩基础随机下限）、战斗力（初始值5）、学期（取值0-8，初始为0）、上学期绩点、总绩点
    let my = new Player("TBD", "TBD", 0, 100, 100, 100, 0, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 5, 0, 0, 0);
    //通关特典待实装
    //随机给出玩家初始属性。计算通关特典加成。
    initializePlayerBuild(my, giftnone, giftnone);
    //上大学前
    setMajorPage(my);
}



//假期页面
function setVacationPage(my, div) {

    let title = document.createElement("h3");
    title.textContent = "假期事件";

    let div1 = document.createElement("div");
    let div2 = document.createElement("div");

    let button = document.createElement("button");
    button.textContent = "知道了";



    //根据是否挂科、年级学期等，显示各假期事件
    if (numCurrentFail > 0 && my.semester != 7 && my.semester != 2) {
        //挂科的情况下，显示复习补考界面
        //第七学期是考研事件，不能跳过。
        div1.textContent = "补考";
        div2.textContent = "挂科了，老老实实在家复习补考吧。（极大幅度消耗心情、精力、体力，提升补考通过率。）";
        my.examBase += 10;
        my.strength -= 25;
        my.spirit -= 25;
        my.mood -= 25;
    } else if (my.semester === 1) {
        div1.textContent = "准备四级考试";
        div2.textContent = "下学期可以考英语四级。要想保研，必须通过四级。将来考研、找工作，通过英语四级也是加分项。利用这个假期，好好准备吧。（消耗心情、精力、体力，大幅提升四级通过概率。）";
        cetBase = 200;
        my.strength -= 10;
        my.spirit -= 10;
        my.mood -= 10;
    } else if (my.semester === 2) {
        div1.textContent = "四级成绩发布";
        let score = calCetScore(my);
        if (score < 425) {
            div2.textContent = "大学英语四级满分710，你考了" + score.toString() + "分。痛失保研资格。";
            gradeReport.appendWarning("没通过四级，失去保研资格！");
        } else {
            div2.textContent = "大学英语四级满分710，你考了" + score.toString() + "分。通过大学英语四级，未来一片光明。";
            eventRecord.updateDiv("通过了英语四级");
            flagCet = true;
        }
    } else if (my.semester === 3) {
        div1.textContent = "准备暑期实习";
        div2.textContent = "听说实习或项目经历很重要。虽说现在还是寒假，但凡事要趁早。现在不提前准备，暑假找不到就麻烦了。（消耗心情、精力、体力，大幅提升找到实习的概率。）";
        my.strength -= 10;
        my.spirit -= 10;
        my.mood -= 10;
        shixiBase = 20;
    } else if (my.semester === 4) {
        div1.textContent = "暑期实习";
        let sx = calShixi(my);
        if (sx === 3) {
            div2.textContent = "找到一份非常好的实习，从中收获很多。不但能写进简历里，技能水平也实打实地提高了。（极大幅度提升眼界、财商、战斗力、智力。）";
            my.horizon += 5;
            my.finance += 5;
            my.intelligence += 5;
            my.battle += 5;
            flagShixi = true;
            eventRecord.updateDiv("实习经历get");
        } else if (sx === 2) {
            div2.textContent = "找到一份实习。辛辛苦苦干了一暑假，累是累点，但确实有收获。（较大幅度提升眼界、财商，消耗体力。）";
            my.horizon += 3;
            my.finance += 3;
            my.strength -= 10;
            flagShixi = true;
            eventRecord.updateDiv("实习经历get");
        } else if (sx === 1) {
            div2.textContent = "只找到辣鸡实习。被辅导员忽悠去校友的黑心企业打白工，干了一暑假。除了张废纸一样的实习证明，啥都没拿到。（大幅消耗体力。）";
            my.strength -= 20;
            flagShixi = true;
            eventRecord.updateDiv("实习经历get");
        } else {
            div2.textContent = "投了十几份简历出去，全部石沉大海。一份像样的实习都没找到。心累。（大幅消耗心情、精力。）";
            my.mood -= 20;
            my.spirit -= 20;
        }
    } else if (my.semester === 5) {
        //分考研和保研两条线
        if (numFailedExam > 0 || !flagCet) {
            div1.textContent = "复习考研";
            div2.textContent = "离考研还有一年，你并不认为自己能坚持下来。但周围同学都开始准备了，你也只好加入考研大军。（较大幅度消耗体力、心情、精力，提升考研分数。）";
            my.strength -= 15;
            my.mood -= 15;
            my.spirit -= 15;
            kaoyanBase += 50;
        } else {
            div1.textContent = "准备保研";
            div2.textContent = "总之，先把简历改漂亮一点。再到网上找往年夏令营笔试题，随手做一做吧。（较大幅度提高智力。）";
            my.intelligence += 3;
        }
    } else if (my.semester === 6) {
        //同样，分考研和保研两条线
        let tgpa = gpaArray2GPA(totalGPAArray);
        if (numFailedExam > 0 || !flagCet) {
            div1.textContent = "复习考研";
            div2.textContent = "离考研只剩半年不到，正是最后冲刺阶段。复习效率杠杠的。（大幅消耗体力、精力，大幅提升考研分数。）";
            my.strength -= 20;
            my.spirit -= 20;
            kaoyanBase += 150;
        } else if (tgpa > 300) {
            div1.textContent = "保研夏令营";
            let by = calBaoYan(my);
            if (by === 3) {
                div2.textContent = "参加顶尖名校的夏令营，被评为优秀营员！和一堆神仙打架，费尽千辛万苦脱颖而出，前途一片光明。（大幅消耗精力。）";
                my.spirit -= 20;
                eventRecord.updateDiv("提前锁定名校研究生");
                flagBaoyan3 = true;
            } else if (by === 2) {
                div2.textContent = "参加了一堆学校的保研夏令营，结果只拿到很一般学校的优营。为什么会这样呢？（大幅降低心情、精力。）";
                my.spirit -= 20;
                my.mood -= 20;
                flagBaoyan2 = true;
                eventRecord.updateDiv("大概能保研");
            } else if (by === 1) {
                div2.textContent = "几乎全部夏令营都一轮游了。别人都在等待面试，你笔试被刷直接先回去了。只有一所非常辣鸡的大学给你发offer。心态崩了。";
                my.mood -= 50;
                flagBaoyan1 = true;
                eventRecord.updateDiv("能保研，但不如不保");
            } else {
                div2.textContent = "整个暑假都在外面跑，结果却颗粒无收，保研全拒得。你感到身心俱疲。";
                my.mood -= 40;
                my.strength -= 40;
                my.spirit -= 40;
            }
        } else {
            div1.textContent = "转投考研";
            div2.textContent = "绩点太低，怎么看都拿不到保研资格。你认清现实，抓紧时间复习考研。现在还来得及。（大幅消耗体力、精力、心情，较大幅度提高考研分数。）";
            my.strength -= 20;
            my.mood -= 20;
            my.spirit -= 20;
            kaoyanBase = 100;
        }
    } else {   //第七学期发生最后一个假期事件。  
        //保研提前进入结局，这里只有考研线
        let ky = calKaoYan(my);
        div1.textContent = "考研成绩公布";
        if (ky === 3) {
            div2.textContent = "初试第一进面，怎么看都稳了。哪怕把老师揍一顿，都照样能读研究生。就是这么自信。";
            eventRecord.updateDiv("考上了名校研究生");
            flagKaoYan3 = true;
            flagKaoYan2 = false;
            flagKaoYan1 = false;
            flagKaoshangYan = true;
        } else if (ky === 2) {
            div2.textContent = "考得比想象中好。早知道能考这么高，就报更好的学校了。唉，知足常乐，有书读总比没有好。学校差就差点吧。";
            eventRecord.updateDiv("考上研究生");
            flagKaoYan2 = true;
            flagKaoYan3 = false;
            flagKaoyan1 = false;
            flagKaoshangYan = true;
        } else if (ky === 1) {
            div2.textContent = "考研初试没过线。这学校好恶心啊，压分压得忒狠。只能联系调剂了。（心情大幅降低。）";
            my.mood -= 20;
            flagKaoYan1 = true;
            flagKaoYan3 = false;
            flagKaoYan2 = false;
            flagKaoshangYan = false;
        } else {
            div2.textContent = "总分4开头，但只有两位数，联系调剂的功夫也省了。你自己都被整笑了。（恢复心情。）";
            my.mood += 10;
            flagKaoYan3 = false;
            flagKaoYan2 = false;
            flagKaoYan1 = false;
            flagKaoshangYan = false;
        }

    }

    statusBanner.updateDiv(my);

    div.className = "vacation-container";
    title.className = "vacation-title";
    div1.className = "vacation-div1";
    div2.className = "vacation-div2";
    button.className = "vacation-button";

    div.appendChild(title);
    div.appendChild(div1);
    div.appendChild(div2);
    div.appendChild(button);

    button.onclick = () => {
        div.removeChild(title);
        div.removeChild(div1);
        div.removeChild(div2);
        div.removeChild(button);
        specialDone = false;
        testEnd(my);
        if(isEnd)
            return;

        if (my.semester % 2 === 1) {
            //上半学期，不显示学年总结。跳转至下一学期规划。挂科的情况下，先跳转补考页面
            my.semester++;
            gradeReport.updateDiv(TBDGPA, my.tgpa,my.major, 0);
            titleBanner.updateDiv(my);
            if (numCurrentFail > 0) {
                //跳转补考页
                examResit.updateDiv();
                return;
            } else {
                //不挂科的情况下，直接跳转学期规划。此时因为numCurrentFail必为0，无需再置零
                my.examBase = 0;
                schoolTodoList.showPlan(my);
                return;
            }
        } else {
            //跳转学年总结页
            yearReport.updateDiv();
            return;
        }

    }

}

//判断游戏是否结束

function testEnd (player) {
    //依次计算心情、体力、精力
    let z = getRandomInteger(15, 100);
    let x = z - player.risk + player.battle + player.luck;
    let mood = player.mood;
    let strength = player.strength;
    let spirit = player.spirit;
    let endflag = 0;

    if (mood < 0 && mood + x < 0) {
        endflag = MOOD_END;
        isEnd = true;
    } else if (strength < 0 && strength + x < 0) {
        endflag =  STRENGTH_END;
        isEnd = true;
    } else if (spirit < 0 && spirit + x < 0) {
        endflag = SPIRIT_END;
        isEnd = true;
    } else if (x < 0) {
        endflag = RISK_END;
        isEnd = true;
    }

    setGameover(player, endflag);
    return;    
}

//显示结局画面
function setGameover (my, endflag) {

    if (endflag === 0) {
        return;
    }

    document.body.innerHTML = githubCorner;
    
    let mainpage = document.createElement("div");
    mainpage.className = "gameover-page";

    let title = document.createElement("h1");
    let titleContainer = document.createElement("div");
    titleContainer.className = "gameover-title";

    titleContainer.appendChild(title);

    let subtitle = document.createElement("h3");
    let subtitleContainer = document.createElement("div");
    subtitleContainer.appendChild(subtitle);
    subtitleContainer.className = "gameover-subtitle";

    let text = document.createElement("p");
    let textContainer = document.createElement("div");
    textContainer.appendChild(text);
    textContainer.className = "gameover-container";

    let button = document.createElement("button");
    button.textContent = "点我进入结算页";
    button.className = "gameover-button";

    button.onclick = () => {
        setEnddataPage(my, endflag);
    }
    
    mainpage.appendChild(titleContainer);
    mainpage.appendChild(subtitleContainer);
    mainpage.appendChild(textContainer);
    mainpage.appendChild(button);

    switch (endflag) {
        case MOOD_END: {
            subtitle.textContent = "郁郁而终";
            text.textContent = "下辈子对自己好点。多出去散散心，别把自己憋坏了。";
            title.textContent = "寄！";
            break;
        }
        case STRENGTH_END: {
            subtitle.textContent = "过劳死";
            text.textContent = "居然能活活累死了，太强了！";
            title.textContent = "寄！";
            break;
        }
        case SPIRIT_END: {
            subtitle.textContent = "行尸走肉";
            text.textContent = "没精力做任何事了。看似还有一口气，其实早就能埋掉了。";
            title.textContent = "寄！";
            break;
        }
        case RISK_END: {
            subtitle.textContent = "猝死";
            text.textContent = "你坏事做尽，被天收了。真是苍天有眼。愿你下辈子做个好人。";
            title.textContent = "寄！";
            break;
        }
        case GUAKE_END: {
            subtitle.textContent = "退学通知书";
            text.textContent = "你补考后仍有五门或以上课程不合格。根据我校学生管理规定，对你做退学处理。就算你有异议，也不允许申诉。  （教务处）";
            title.textContent = "寄！";
            break;
        }
        case PERFECT_END: {
            subtitle.textContent = "圆满落幕";
            text.textContent = "考研工作两手抓。既拿到名校的研究生offer，又能进大厂。人生跟开了挂一样。";
            title.textContent = "完美通关";
            break;
        }
        case BAOYAN_END: {
            subtitle.textContent = "保送研究生";
            text.textContent = "三年的努力有了回报。以梦为马，不负韶华。";
            title.textContent = "未来可期";
            break;
        }
        case KAOYAN_END: {
            subtitle.textContent = "考上研究生";
            text.textContent = "顺利从大学毕业，下学期继续读研究生。真是可喜可贺。";
            title.textContent = "未来可期";
            break;
        }
        case GONGZUO3_END:
        case GONGZUO2_END: 
        subtitle.textContent = "找到工作";
        text.textContent = "毕业后有地方去了，正式成为社会人。";
        title.textContent = "未来可期";
        break;
        case BIYE_SHIYE_END: {
            subtitle.textContent = "毕业即失业";
            text.textContent = "大学四年顺利度过，但之后只能当家里蹲了。";
            title.textContent = "未来可寄";
            break;
        }
        case GONGZUO1_END: {
            subtitle.textContent = "黑作坊牛马";
            text.textContent = "不如高中直接进厂，少走四年弯路。";
            title.textContent = "生不如死";
            break;
        }
        case DANBIYE_END: {
            subtitle.textContent = "单证战士";
            text.textContent = "毕业了，但没完全毕业。其实……学位证也没那么重要？";
            title.textContent = "未来可寄";
            break;
        }
        case JIEYE_END: {
            subtitle.textContent = "大学结业";
            text.textContent = "甚至没能毕业。说好的大学宽进严出呢？";
            title.textContent = "未来可寄";
            break;
        }
        case XSH_END: {
            subtitle.textContent = "学生会长";
            text.textContent = "成为了这所学校的最高权力者。已经别无所求了。";
            title.textContent = "隐藏结局";
            break;
        }
        case GGZ_END: {
            subtitle.textContent = "沉迷页游";
            text.textContent = "氪到全服第一，强大无需多言。";
            title.textContent = "隐藏结局";
            break;
        }
        case NOBEL_END: {
            subtitle.textContent = "诺奖得主";
            text.textContent = "成为第一个诺贝尔数学奖得主。你就是创造历史的人！";
            title.textContent = "隐藏结局";
            break;
        }
    }
    document.body.appendChild(mainpage);

    
    
}




function setEnddataPage(player, endflag) {

    document.body.innerHTML = githubCorner;

    let fflag = endflag;
    if (endflag === BAOYAN_END) {
        if (flagBaoyan3) {
            fflag = BAOYAN3_END;
        } else if (flagBaoyan2) {
            fflag = BAOYAN2_END;
        } else if (flagBaoyan1) {
            fflag = BAOYAN1_END;
        }
    }
    if (endflag === KAOYAN_END) {
        if (flagKaoYan3) {
            fflag = KAOYAN3_END;
        } else if (flagKaoYan2) {
            fflag = KAOYAN2_END;
        } else if (flagKaoYan1) {
            fflag = KAOYAN1_END;
        }
    }
    let rank = end2rank(fflag);  //获得结局的评价等级
    

    let mainpage = document.createElement("div");

    let title = document.createElement("h1");
    title.textContent = "结算页";

    let container = document.createElement("div");

    let button = document.createElement("button");
    button.textContent = "选择通关特典";

    let endrankdiv = endRecordDiv(rank);

    let scorelist = document.createElement("ul");

    let wealthLi = document.createElement("li");
    let univLi = document.createElement("li");
    let intelligenceLi = document.createElement("li");
    let horizonLi = document.createElement("li");
    let financeLi = document.createElement("li");
    let battleLi = document.createElement("li");
    let endLi = document.createElement("li");

    scorelist.appendChild(wealthLi);
    scorelist.appendChild(univLi);
    scorelist.appendChild(intelligenceLi);
    scorelist.appendChild(horizonLi);
    scorelist.appendChild(financeLi);
    scorelist.appendChild(battleLi);
    scorelist.appendChild(endLi);
    container.appendChild(scorelist);

    
    let wealthspan = wealth2RatingSpan(player.wealth);
    wealthLi.appendChild(wealthspan);
    let univspan = univ2RatingSpan(player.univRank);
    univLi.appendChild(univspan);
    let intelspan = inte2RatingSpan(player.intelligence, endflag);
    intelligenceLi.appendChild(intelspan);
    let horspan = hor2RatingSpan(player.horizon);
    horizonLi.appendChild(horspan);
    let finspan = fin2RatingSpan(player.finance);
    financeLi.appendChild(finspan);
    let battlespan = battle2RatingSpan(player.battle);
    battleLi.appendChild(battlespan);
    let endspan = end2RatingSpan(endflag);
    endLi.appendChild(endspan);



    mainpage.appendChild(title);
    mainpage.appendChild(container);

    mainpage.appendChild(endrankdiv);
    mainpage.appendChild(button);

    mainpage.className = "enddata-page";
    title.className = "enddata-title";
    container.className = "enddata-container";
    endrankdiv.className = "enddata-rankdiv";
    button.className = "enddata-button";

    button.onclick = () => {
        //选择通关特典重开
        if (rank >= bestRecord) {
            bestRecord = rank;
        }
        setGiftPage(bestRecord);
    }

    document.body.appendChild(mainpage);
    

}







//通关特典

function setGiftPage(rank) {
    //根据上一轮结局评价，给予部分通关特典
    let maindiv = document.createElement("div");
    maindiv.className = "gift-page";
    
    let title = document.createElement("h2");
    title.textContent = "选择一项通关特典";
    title.className = "gift-title";
    if (rank >= A_END_RANK) {
        title.textContent = "历史最高评价达到A以上，可选择两项特典";
    }

    let button = document.createElement("button");
    button.className = "gift-button";
    button.textContent = "继承通关特典，再来一局！";
    let giftcontainer = document.createElement("div");
    giftcontainer.className = "gift-container";
    
    let currentGiftlist = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
    let currentGiftDess = ["ich", "ni", "sann", "shi", "go", "roku", "nana", "hachi", "kyuu", "jyuu"];

    switch(rank) {
        case S_END_RANK: {
            currentGiftlist = SrankGiftTexts;
            currentGiftDess = SrankGiftDess;
            break;
        }
        case A_END_RANK: {
            currentGiftlist = ArankGiftTexts;
            currentGiftDess = ArankGiftDess;
            break;
        }
        case B_END_RANK: {
            currentGiftlist = BrankGiftTexts;
            currentGiftDess = BrankGiftDess;
            break;
        }
        case C_END_RANK: {
            currentGiftlist = CrankGiftTexts;
            currentGiftDess = CrankGiftDess;
            break;
        }
        case D_END_RANK: {
            currentGiftlist = DrankGiftTexts;
            currentGiftDess = DrankGiftDess;
            break;
        }
        default: {
            currentGiftlist = ErankGiftTexts;
            currentGiftDess = ErankGiftDess;
            break;
        }
    }

    let selectedgifts = [];

    for (let i = 0; i < currentGiftlist.length; i++) {
        let gdiv = document.createElement("div");
        let span1 = document.createElement("span");
        let span2 = document.createElement("span");
        gdiv.className = "gift-item";
        gdiv.appendChild(span1);
        gdiv.appendChild(span2);
        span1.textContent = currentGiftlist[i];
        span1.className = gift2SpanClassname(currentGiftlist[i]);
        span2.textContent = currentGiftDess[i];

        gdiv.addEventListener("click", function () {
            if (span1.textContent === giftLowrank) {
                return;
            }
            if (this.classList.contains("done")) {
                let index = selectedgifts.indexOf(span1.textContent);
                if (index !== -1) {
                    selectedgifts.splice(index, 1);
                }
                this.classList.toggle("done");
                return; 
            }
            if (selectedgifts.length >= 2) {
                alert("最多选择两项特典");
                return;
            }
            if (selectedgifts.length >= 1 && rank < A_END_RANK) {
                alert("最多选择一项特典");
                return;
            }
            this.classList.toggle("done");
            selectedgifts.push(span1.textContent);
        })
        giftcontainer.appendChild(gdiv);
    }


    button.onclick = () => {
        if (selectedgifts.length < 2 && rank >= A_END_RANK) {
            alert("历史最佳达到A以上，请选择两项特典");
            return;
        } 
        if (selectedgifts.length < 1) {
            alert("请选择一项特典");
            return;
        }
        if (selectedgifts.length === 1) {
            resetGame(selectedgifts[0], giftnone);
        }
        if (selectedgifts.length === 2) {
            resetGame(selectedgifts[0], selectedgifts[1]);
        }
    }



    maindiv.appendChild(title);
    maindiv.appendChild(giftcontainer);
    maindiv.appendChild(button);
    
    document.body.innerHTML = "";
    //document.body.innerHTML = githubCorner;
    document.body.appendChild(maindiv);

}


//重置游戏
function resetGame(giftstring1, giftstring2) {
    //初始化与游戏进度相关的全局变量

    flagPinKunBuZhu = false;  //贫困补助
    flagXueShengHui = false; //学生会
    flagGuGuZhen = false;   //氪金页游
    flagNobel = false;    //诺奖相关事件
    eventPhase = 0;     //记录各事件进展阶段

    cetBase = 0;  //通过英语四级的基数
    shixiBase = 0;  //找到实习的基数
    flagCet = false;  //标志是否通过四级
    flagShixi = false;  //标志是否有实习经历
    flagRongYu = false;  //判断是否有（校级）荣誉

    numFailedExam = 0;  //表示挂过多少科
    numCurrentFail = 0;  //这学期多少门考试没通过
    flagJuanWang = false;  //与通关特典有关
    totalGPAArray = [];  //数组，用于储存考试成绩。元素是0-400的绩点，不是百分制成绩。

    specialDone = false;  //用于判断当前学期，是否已发生特殊事件
    jobpageDone = false; //用于表示第四年的求职计划页是否已显示
    flagQiuzhi = false;  //判断玩家是否投简历出去
    globalVocDivPointer = null;  //用来传参的一个全局指针，没实际含义
    flagGradeWarning = false;  //判断是否触发过学业警告，目前还没用到

    kaoyanBase = 0;  //考研分基数
    lunwenBase = 0;   //毕业论文基数
    flagBaoyan3 = false; //名校保研
    flagBaoyan2 = false;  //一般学校保研
    flagBaoyan1 = false;  //辣鸡学校保研
    flagKaoYan3 = false; //名校考研
    flagKaoYan2 = false; //一般校考研
    flagKaoYan1 = false;  //一志愿考研失败

    flagBaoyanEnd = false;
    flagKaoshangYan = false;  //考上研
    flagGongzuo3 = false;  //好工作
    flagGongzuo2 = false; //一般的工作
    flagGongzuo1 = false; //烂工作
    flagXuewei = false;  //毕业证+学位证
    flagDanbiye = false;  //单毕业证
    flagJieye = false;  //结业
    isEnd = false;  //非正常死亡
    
    
    // 初始化玩家信息。尚未实装的功能用TBD表示。
    //分别是 姓名、性别、家境、心情、体力、精力、智商、眼界、财商、幸运、风险、资金、年级、所上大学排名（初始值100）、专业代码（初始值0）、学期规划轮次（用于跟踪学期规划决断次数、期末考试成绩基础随机下限）、战斗力（初始值5）、学期（取值0-8，初始为0）、上学期绩点、总绩点
    let my = new Player("TBD", "TBD", 0, 100, 100, 100, 0, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 5, 0, 0, 0);
    //通关特典
    //随机给出玩家初始属性。计算通关特典加成。
    initializePlayerBuild(my, giftstring1, giftstring2);
    //上大学前
    setMajorPage(my);
}

const githubCorner=`<a href="https://github.com/lingch16/UnivSimulator" target="_blank" class="github-corner" title="View source on GitHub">
<svg width="80" height="80" viewBox="0 0 250 250" style="fill:#333; color:#fff; position: absolute; top: 0; border: 0; left: 0; transform: scale(-1, 1);" aria-hidden="true">
<path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
<path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path>
<path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body"></path>
</svg>
</a>`
