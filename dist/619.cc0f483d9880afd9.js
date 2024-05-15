"use strict";(self.webpackChunkInvestment_News_Aggregator_and_Analysis_Tool_project=self.webpackChunkInvestment_News_Aggregator_and_Analysis_Tool_project||[]).push([[619],{619:(P,h,o)=>{o.r(h),o.d(h,{DashboardComponent:()=>C});var g=o(5861),f=o(6895),u=o(1981),p=o(3683),m=o(4218),y=o(6950),v=o(266),_=o(1572),e=o(4650),x=o(6425);function w(a,d){if(1&a&&(e.TgZ(0,"div",42)(1,"a",43)(2,"div",44)(3,"div",45),e._uU(4),e.qZA(),e.TgZ(5,"div",46),e._uU(6),e.qZA()()(),e._UZ(7,"br")(8,"hr",9),e.qZA()),2&a){const t=d.$implicit;e.xp6(1),e.s9C("href",t.url,e.LSH),e.xp6(3),e.Oqu(t.title),e.xp6(2),e.Oqu(t.polarity.toFixed(3))}}function b(a,d){if(1&a&&(e.TgZ(0,"div",42)(1,"a",43)(2,"div",44)(3,"div",45),e._uU(4),e.qZA(),e.TgZ(5,"div",46),e._uU(6),e.qZA()()(),e._UZ(7,"br")(8,"hr",9),e.qZA()),2&a){const t=d.$implicit;e.xp6(1),e.s9C("href",t.url,e.LSH),e.xp6(3),e.Oqu(t.title),e.xp6(2),e.Oqu(t.polarity.toFixed(3))}}let C=(()=>{class a{constructor(t,i){this.supabaseService=t,this.route=i,this.showXAxis=!0,this.showYAxis=!0,this.gradient=!1,this.showLegend=!0,this.showXAxisLabel=!0,this.xAxisLabel="Date",this.showYAxisLabel=!0,this.yAxisLabel="Polarity",this.timeline=!0}ngOnInit(){var t=this;return(0,g.Z)(function*(){t.route.params.subscribe(i=>{t.industryName=i.industryName,t.tableName=i.tableName}),t.setLogoAndInfoText(),yield t.getNews(),t.setChart()})()}getNews(){var t=this;return(0,g.Z)(function*(){t.articles=yield t.supabaseService.getData(t.tableName),t.numberOfArticles=t.articles.length;let i=0;for(let r=0;r<t.articles.length;r++)i+=t.articles[r].polarity;t.polarity=(i/t.articles.length).toFixed(4),t.top5GoodArticles=yield t.supabaseService.getTop5GoodNews(t.tableName),t.top5BadArticles=yield t.supabaseService.getTop5BadNews(t.tableName)})()}setChart(){this.lineChartData=[];const t={name:this.industryName,series:[]},i=new Map;for(const c of this.articles){const s=new Date(c.published_at).toISOString().slice(0,10);i.has(s)||i.set(s,{totalPolarity:0,articleCount:0});let l=i.get(s);l.totalPolarity+=parseFloat(c.polarity),l.articleCount++}let n=0,r=0;const O=Array.from(i.keys()).sort();for(const c of O){const s=i.get(c);n+=s.totalPolarity,r+=s.articleCount;const l=n/r;t.series.push({name:new Date(c),value:l})}this.lineChartData.push(t),document.getElementById("chart-spinner")?.style.setProperty("display","none"),document.getElementById("chart")?.style.setProperty("display","flex")}setLogoAndInfoText(){switch(console.log(this.industryName),this.industryName){case"Crowdstrike":this.industryLogo="/assets/crowdstrikeLogo.png",this.infoText="CrowdStrike is a cloud-based cybersecurity company specializing in next-generation security verticals such as endpoint, cloud workload, identity, and security operations. CrowdStrike\u2019s primary offering is its Falcon platform that offers a proverbial single pane of glass for an enterprise to detect and respond to security threats attacking its IT infrastructure. The Texas-based firm was founded in 2011 and went public in 2019.";break;case"Microsoft":this.industryLogo="/assets/microsoftLogo.png",this.infoText="Microsoft develops and licenses consumer and enterprise software. It is known for its Windows operating systems and Office productivity suite. The company is organized into three equally sized broad segments: productivity and business processes (legacy Microsoft Office, cloud-based Office 365, Exchange, SharePoint, Skype, LinkedIn, Dynamics), intelligence cloud (infrastructure- and platform-as-a-service offerings Azure, Windows Server OS, SQL Server), and more personal computing (Windows Client, Xbox, Bing search, display advertising, and Surface laptops, tablets, and desktops).";break;case"Berkshire Hathaway":this.industryLogo="/assets/berkshire-hathawayLogo.png",this.infoText="Berkshire Hathaway is a holding company with a wide array of subsidiaries engaged in diverse activities. The firm's core business segment is insurance, run primarily through Geico, Berkshire Hathaway Reinsurance Group, and Berkshire Hathaway Primary Group. Berkshire has used the excess cash thrown off from these and its other operations over the years to acquire Burlington Northern Santa Fe (railroad), Berkshire Hathaway Energy (utilities and energy distributors), and the firms that make up its manufacturing, service, and retailing operations (which include five of Berkshire's largest noninsurance pretax earnings generators: Precision Castparts, Lubrizol, Clayton Homes, Marmon, and IMC/ISCAR). The conglomerate is unique in that it is run on a completely decentralized basis.";break;case"Healthcare Industry":this.industryLogo="/assets/healthcare-industryLogo.png",this.infoText="The healthcare industry is critical for promoting, maintaining, and restoring health through the prevention, diagnosis, and treatment of disease. This industry is divided into Pharmaceuticals (focused on the development and production of medications), Medical Devices (encompassing the creation and supply of medical instruments and apparatuses), and Healthcare Services (including hospital care, nursing, and other healthcare provider services). This sector is characterized by a strong commitment to research and development, aiming to improve patient outcomes and the efficiency of healthcare delivery.";break;case"Petroleum Industry":this.industryLogo="/assets/petroleum-industryLogo.png",this.infoText="The petroleum industry, also known as the oil and gas industry, is involved in the global processes of exploration, extraction, refining, transporting, and marketing petroleum products. The main areas of this industry include the Upstream sector (which deals with exploration and production of oil and natural gas), Midstream (focusing on transportation and storage of crude oil and gases), and Downstream (which involves the refining of crude oil and processing of raw natural gas into marketable products and chemicals). This industry is crucial for the global energy supply and is heavily invested in exploring sustainable and environmentally friendly energy practices to mitigate environmental impact.";break;case"Technology Industry":this.industryLogo="/assets/technology-industryLogo.png",this.infoText="The technology industry is a vast and rapidly evolving sector that encompasses a range of products and services aimed at enhancing and facilitating digital and computational processes. This industry can be broadly segmented into Hardware (including the manufacturing of electronic devices, computers, and telecommunications equipment), Software (ranging from system and application software to cloud computing and AI solutions), and Services (such as IT consulting, data processing, and hosting services). Companies within this sector are pivotal in driving innovation, with a focus on continuous improvement of connectivity, processing power, and user accessibility.";break;case"Bayer AG":this.industryLogo="/assets/bayerLogo.png",this.infoText="Bayer is a German healthcare and agriculture conglomerate. Healthcare provides close to half of the company's sales and includes pharmaceutical drugs as well as vitamins and other consumer healthcare products. The firm also has a crop science business that includes seeds, pesticides, herbicides, and fungicides, which was expanded through the acquisition of Monsanto."}}checkPolarity(t){let i,n;return t<-.1?(i="sentiment_dissatisfied",n="red"):t<.1?(i="sentiment_neutral",n="yellow"):t>.1?(i="sentiment_very_satisfied",n="green"):(i="undefined",n="black"),{sentiment:i,color:n}}static#e=this.\u0275fac=function(i){return new(i||a)(e.Y36(x.T),e.Y36(u.gz))};static#t=this.\u0275cmp=e.Xpm({type:a,selectors:[["app-dashboard"]],standalone:!0,features:[e.jDz],decls:64,vars:21,consts:[["name","viewport","content","width=device-width, initial-scale=1.0"],["href","https://financenewscollector.com",1,"arrow"],[1,"material-icons",2,"font-size","5vh"],[1,"toolbar-text"],[1,"page",2,"display","flex","flex-direction","column"],[1,"page-content"],[1,"left-side-container"],[1,"industry-name-and-logo-container"],[1,"industry-name"],["width","60%","color","#A8385D"],[1,"industry-logo-container"],["alt","Industry logo",3,"src"],[1,"first-left-container"],[1,"chart-container"],[1,"chart-header"],[1,"material-symbols-outlined"],["matTooltip"," Cumulative line chart or cumulative frequency chart, is a graphical representation that shows the cumulative sum or total of a series of values over time or another dimension."],["id","chart-spinner",1,"chart-spinner"],["id","chart",1,"chart",2,"display","none"],[2,"fill","white",3,"scheme","results","gradient","xAxis","yAxis","legend","showXAxisLabel","showYAxisLabel","xAxisLabel","yAxisLabel","timeline"],[1,"right-side-container"],[2,"display","flex","flex-direction","column"],[1,"polarity-and-articles"],[1,"polarity-container"],["id","sentiment-icon",1,"sentiment-icon",3,"matTooltip"],[1,"total-articles-container"],[1,"news-container"],["id","good-news-container",1,"top-news"],[1,"news-text"],["width","80%","color","#A8385D"],[1,"articles-container"],["class","article-container",4,"ngFor","ngForOf"],["id","bad-news-container",1,"top-news"],[1,"bottom-toolbar"],[2,"display","flex","flex-direction","row","justify-content","center","align-items","center"],["href","https://github.com/Akukoskela/Investment-News-Aggregator-and-Analysis-Tool-project",2,"margin-left","5vh"],["width","98","height","96","xmlns","http://www.w3.org/2000/svg"],["fill-rule","evenodd","clip-rule","evenodd","d","M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z","fill","#fff"],[2,"display","flex","flex-direction","row","justify-content","center","align-items","center","width","20vh"],[2,"margin-right","10%"],["href","https://www.linkedin.com/in/aku-koskela-93179a234/"],["src","/assets/linkedin.png","alt","linkedin logo",1,"linkedin-image"],[1,"article-container"],[3,"href"],[2,"display","flex","flex-direction","row"],[1,"article-title"],[1,"article-polarity"]],template:function(i,n){1&i&&(e._UZ(0,"meta",0),e.TgZ(1,"mat-toolbar")(2,"a",1)(3,"span",2),e._uU(4," arrow_back "),e.qZA()(),e.TgZ(5,"div",3),e._uU(6," Dashboard "),e.qZA()(),e.TgZ(7,"div",4)(8,"div",5)(9,"div",6)(10,"div",7)(11,"div",8),e._uU(12),e._UZ(13,"hr",9),e.qZA(),e.TgZ(14,"div",10),e._UZ(15,"img",11),e.qZA()(),e.TgZ(16,"div",12)(17,"p"),e._uU(18),e.qZA()(),e.TgZ(19,"div",13)(20,"div",14)(21,"p"),e._uU(22,"Cumulative line chart"),e.qZA(),e.TgZ(23,"span",15)(24,"mat-icon",16),e._uU(25,"info"),e.qZA()()(),e.TgZ(26,"div",17),e._UZ(27,"mat-spinner"),e.qZA(),e.TgZ(28,"div",18),e._UZ(29,"ngx-charts-line-chart",19),e.qZA()()(),e.TgZ(30,"div",20)(31,"div",21)(32,"div",22)(33,"div",23),e._uU(34," Polarity: "),e.TgZ(35,"mat-icon",24),e._uU(36),e.qZA()(),e.TgZ(37,"div",25),e._uU(38),e.qZA()(),e.TgZ(39,"div",26)(40,"div",27)(41,"div",28),e._uU(42," Top 5 good news "),e._UZ(43,"hr",29),e.qZA(),e.TgZ(44,"div",30),e.YNc(45,w,9,3,"div",31),e.qZA()(),e.TgZ(46,"div",32)(47,"div",28),e._uU(48," Top 5 bad news "),e._UZ(49,"hr",29),e.qZA(),e.TgZ(50,"div",30),e.YNc(51,b,9,3,"div",31),e.qZA()()()()()(),e.TgZ(52,"mat-toolbar",33)(53,"div",34)(54,"p"),e._uU(55,"Source code:"),e.qZA(),e.TgZ(56,"a",35),e.O4$(),e.TgZ(57,"svg",36),e._UZ(58,"path",37),e.qZA()()(),e.kcU(),e.TgZ(59,"div",38)(60,"p",39),e._uU(61,"Developer:"),e.qZA(),e.TgZ(62,"a",40),e._UZ(63,"img",41),e.qZA()()()()),2&i&&(e.xp6(12),e.hij("",n.industryName," "),e.xp6(3),e.s9C("src",n.industryLogo,e.LSH),e.xp6(3),e.Oqu(n.infoText),e.xp6(11),e.Q6J("scheme","cool")("results",n.lineChartData)("gradient",n.gradient)("xAxis",n.showXAxis)("yAxis",n.showYAxis)("legend",n.showLegend)("showXAxisLabel",n.showXAxisLabel)("showYAxisLabel",n.showYAxisLabel)("xAxisLabel",n.xAxisLabel)("yAxisLabel",n.yAxisLabel)("timeline",n.timeline),e.xp6(6),e.Udp("color",n.checkPolarity(n.polarity).color),e.s9C("matTooltip",n.polarity),e.xp6(1),e.hij(" ",n.checkPolarity(n.polarity).sentiment," "),e.xp6(2),e.hij(" Articles analysed: ",n.numberOfArticles," "),e.xp6(7),e.Q6J("ngForOf",n.top5GoodArticles),e.xp6(6),e.Q6J("ngForOf",n.top5BadArticles))},dependencies:[f.ez,f.sg,u.Bz,p.g0,p.Ye,m.Ps,m.Hw,y.a4,y.Dw,v.AV,v.gM,_.Cq,_.Ou],styles:["mat-toolbar[_ngcontent-%COMP%]{height:11vh;display:flex;flex-direction:row;background-color:#1b1e27;color:#fff;border-bottom:solid;border-color:#a8385d;border-bottom-width:.3vh}.linkedin-image[_ngcontent-%COMP%]:hover{transition:all .2s ease-in-out;transform:scale(.9)}.sentiment-icon[_ngcontent-%COMP%]{padding-left:1vh;transform:scale(1.8)}.arrow[_ngcontent-%COMP%]{margin-right:5vh;color:#fff}a[_ngcontent-%COMP%]{color:#000}.polarity-and-articles[_ngcontent-%COMP%]{display:flex;flex-direction:row;width:90%;justify-content:center}.arrow[_ngcontent-%COMP%]:hover{color:#a8385d;cursor:pointer}.toolbar-text[_ngcontent-%COMP%]{font-size:x-large}.page[_ngcontent-%COMP%]{display:flex;flex-direction:row;width:100%;height:auto;background-color:#2f3646}.left-side-container[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;width:50%}.right-side-container[_ngcontent-%COMP%]{display:flex;flex-direction:column;width:50%;margin-top:7vh}.first-left-container[_ngcontent-%COMP%]{display:flex;justify-content:center;margin:2vh;padding:3vh;border-radius:2vh;width:-moz-fit-content;width:fit-content;height:-moz-fit-content;height:fit-content;background-color:#1b1e27;color:#fff;font-size:large;line-height:1.6}.polarity-container[_ngcontent-%COMP%], .total-articles-container[_ngcontent-%COMP%]{margin:2vh;padding:3vh;border-radius:2vh;width:-moz-fit-content;width:fit-content;height:-moz-fit-content;height:fit-content;background-color:#1b1e27;color:#fff;font-size:xx-large}.chart-header[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;margin-top:2%;color:#fff;font-size:large}.chart-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin-top:1%;margin-right:2%;display:flex;justify-content:center;align-items:center}.chart-container[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;margin-top:5vh;width:95%;height:70vh;background-color:#1b1e27;border-radius:1vh;box-shadow:0 0 10px #0000004d;color:gray}.chart-spinner[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;margin-top:20%}.chart[_ngcontent-%COMP%]{display:flex;width:100%;height:90%;margin-top:5%}.top-news[_ngcontent-%COMP%]{display:flex;flex-direction:column;background-color:#1b1e27;color:#fff;width:50%;height:-moz-fit-content;height:fit-content;margin:6vh 2vh 2vh;border-radius:1vh;box-shadow:0 0 10px #00000080}.articles-container[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:space-around;height:100%;margin-top:3vh}.article-container[_ngcontent-%COMP%]{display:flex;flex-direction:column;margin-bottom:4vh;border-radius:1vh}.article-container[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:hover{cursor:pointer;text-decoration:underline}.article-title[_ngcontent-%COMP%]{margin-left:2vh;font-size:large;width:80%;font-weight:400;color:#fff}.article-polarity[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;font-size:medium;color:#fff}.news-text[_ngcontent-%COMP%]{display:flex;align-items:center;flex-direction:column;justify-content:center;width:100%;font-size:x-large;margin-top:3vh}.industry-name-and-logo-container[_ngcontent-%COMP%]{display:flex;flex-direction:row;width:95%}.industry-name[_ngcontent-%COMP%]{display:flex;flex-direction:column;width:100%;justify-content:end;align-items:center;font-size:5vh;font-weight:410;color:#fff}.industry-logo-container[_ngcontent-%COMP%]{display:flex;background-color:#fff;margin-top:1vh;justify-content:center;align-items:center;width:8rem;height:8rem;overflow:hidden;border-radius:55%;border:solid;border-color:#a8385d;box-shadow:0 0 10px #00000080}img[_ngcontent-%COMP%]{display:flex;width:80%}.news-container[_ngcontent-%COMP%]{display:flex;flex-direction:row}.bottom-toolbar[_ngcontent-%COMP%]{margin-top:5vh;display:flex;justify-content:space-around}svg[_ngcontent-%COMP%]:hover{transition:all .2s ease-in-out;transform:scale(.6)}svg[_ngcontent-%COMP%]{transform:scale(.7)}.page-content[_ngcontent-%COMP%]{display:flex;flex-direction:row}@media (max-width:1334px){.industry-name[_ngcontent-%COMP%]{display:flex;flex-direction:column;width:100%;justify-content:end;align-items:center;font-size:3vh;font-weight:410;color:#fff}.polarity-and-articles[_ngcontent-%COMP%]{display:flex;flex-direction:column;width:90%;justify-content:center}.polarity-container[_ngcontent-%COMP%], .total-articles-container[_ngcontent-%COMP%]{margin:2vh;padding:3vh;border-radius:2vh;width:-moz-fit-content;width:fit-content;height:-moz-fit-content;height:fit-content;background-color:#1b1e27;color:#fff;font-size:x-large}.news-container[_ngcontent-%COMP%]{display:flex;flex-direction:column}.top-news[_ngcontent-%COMP%]{display:flex;flex-direction:column;background-color:#1b1e27;color:#fff;width:90%;height:-moz-fit-content;height:fit-content;margin:6vh 2vh 2vh;border-radius:1vh;box-shadow:0 0 10px #00000080}.chart-container[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;margin-top:5vh;width:95%;height:40%;background-color:#1b1e27;border-radius:1vh;box-shadow:0 0 10px #0000004d;color:gray}.chart-header[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;margin-top:2%;color:#fff;font-size:large}.chart-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{padding-top:1%;margin-right:2%;display:flex;justify-content:center;align-items:center}.first-left-container[_ngcontent-%COMP%]{display:flex;justify-content:center;margin:2vh;padding:3vh;border-radius:2vh;width:-moz-fit-content;width:fit-content;height:-moz-fit-content;height:fit-content;background-color:#1b1e27;color:#fff;font-size:medium;line-height:1.6}@media (max-width:780px){.page-content[_ngcontent-%COMP%]{display:flex;flex-direction:column}.logo-container-container[_ngcontent-%COMP%]{display:none}.left-side-container[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;justify-content:center;width:100%;height:-moz-fit-content;height:fit-content;padding-top:6vh}.right-side-container[_ngcontent-%COMP%]{display:flex;flex-direction:column;width:100%}.polarity-and-articles[_ngcontent-%COMP%]{display:flex;flex-direction:column;width:90%;justify-content:center;align-items:center}.chart-container[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;margin-top:5vh;width:95%;height:65vh;background-color:#1b1e27;border-radius:1vh;box-shadow:0 0 10px #0000004d;color:gray}.chart-header[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;padding-top:2%;color:#fff;font-size:large}.chart-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{padding-top:1%;margin-right:2%;display:flex;justify-content:center;align-items:center}}}"]})}return a})()}}]);