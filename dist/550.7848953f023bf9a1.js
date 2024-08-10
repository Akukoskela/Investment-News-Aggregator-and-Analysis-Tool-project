"use strict";(self.webpackChunkInvestment_News_Aggregator_and_Analysis_Tool_project=self.webpackChunkInvestment_News_Aggregator_and_Analysis_Tool_project||[]).push([[550],{8550:(W,O,c)=>{c.r(O),c.d(O,{HomeComponent:()=>R});var w=c(5861),g=c(7155),_=c(4859),D=c(3683),k=c(6950),M=c(3336),S=c(266),U=c(1572),b=c(5412),t=c(4650);let N=(()=>{class a{constructor(){}formatDate(e){const o=new Date(e),n=o.getFullYear(),r=String(o.getMonth()+1).padStart(2,"0"),s=String(o.getDate()).padStart(2,"0");return String(o.getHours()).padStart(2,"0"),String(o.getMinutes()).padStart(2,"0"),`${n}-${r}-${s}`}static#t=this.\u0275fac=function(o){return new(o||a)};static#e=this.\u0275cmp=t.Xpm({type:a,selectors:[["dialog-content-example-dialog"]],standalone:!0,features:[t.jDz],decls:33,vars:1,consts:[[1,"container"],["mat-dialog-title",""],[1,"title"],["mat-dialog-content",""],[1,"content"],[2,"font-size","x-large"],["href","https://textblob.readthedocs.io/en/dev/"],[2,"color","red"],["mat-dialog-actions",""],["mat-button","",1,"button",3,"mat-dialog-close"]],template:function(o,n){1&o&&(t.TgZ(0,"div",0)(1,"div",1)(2,"h2",2),t._uU(3,"Info"),t.qZA()(),t.TgZ(4,"div",3)(5,"div",4)(6,"p"),t._uU(7,"The idea of this project is to aggregate and analyze investment news with machine learning. I want to test how machine learning can be used with investment sector and if it (or this software) can be used when doinginvestment decisions.The project is developed with Angular.ts, Supabase and Python."),t.qZA(),t._UZ(8,"br"),t.TgZ(9,"h2",5),t._uU(10,"How does it work?"),t.qZA(),t.TgZ(11,"p"),t._uU(12,"First, we run the backend code which fetch, analyse and send the articles to database. Then the frontend fetches the articles from the database and shows it to user "),t.qZA(),t._UZ(13,"br"),t.TgZ(14,"h2",5),t._uU(15,"How does it analyse the articles?"),t.qZA(),t.TgZ(16,"p"),t._uU(17,"This project analyses articles with Pythons "),t.TgZ(18,"a",6),t._uU(19,"TextBlob"),t.qZA(),t._uU(20," library wich uses NLP (Natural language processing) to give us the sentiment analysis for each article. From sentiment analysis we get the polarity value between -1 and 1. The polarity value tells us if the text from article were more positive or negative. "),t.qZA(),t._UZ(21,"br"),t.TgZ(22,"h2",5),t._uU(23,"Can't find the news article on the web?"),t.qZA(),t.TgZ(24,"p"),t._uU(25," News articles are removed constantly from the web by publishers to make space for new articles. However, the original text of the article can be read in this software by clicking the article's header. It will open a pop-up window where is more info about the article. (Coming soon..) "),t.qZA()(),t._UZ(26,"br")(27,"br"),t.TgZ(28,"p",7),t._uU(29,"DO NOT USE THIS SOFTWARE TO HELP YOU MAKE AN INVESTMENT DECISION! SOFTWARE IS NOT READY YET AND I CAN'T GUARANTEE IT WORKS."),t.qZA(),t.TgZ(30,"div",8)(31,"button",9),t._uU(32,"Back"),t.qZA()()()()),2&o&&(t.xp6(31),t.Q6J("mat-dialog-close",!0))},dependencies:[b.Is,b.ZT,b.uh,b.xY,b.H8,_.ot,_.lW],styles:[".container[_ngcontent-%COMP%]{background-color:#1b1e27;border:solid;border-width:3px;border-color:#a8385d}.content[_ngcontent-%COMP%]{font-size:large;color:#fff}.content[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:#a8385d}.content[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{display:flex;width:-moz-fit-content;width:fit-content;border-bottom:solid;border-color:#a8385d}.title[_ngcontent-%COMP%]{font-size:xx-large;color:#fff}.button[_ngcontent-%COMP%]{background-color:#a8385d;color:#fff}"]})}return a})();var x=c(1561),I=c(8320),H=c(8996);let j=(()=>{class a{constructor(e){this.supabaseService=e,this.tickerSymbols=[["CRWD","Crowdstrike"],["BRK.B","Berkshire Hathaway B"],["MSFT","Microsoft"],["BAYRY","Bayer AG"],["QQQ","Invesco QQQ Trust Series 1(Technology)"],["VGHCX","Vanguard Health Care Fund Investor Shares"],["XOP","SPDR S&P Oil & Gas Exploration & Production ETF "]]}getStockData(e){var o=this;return(0,w.Z)(function*(){const n=new Date;if(0==n.getDay()||6==n.getDay())console.log("Weekend, no data to update");else{const r=new Date,s=new Date(r);s.setDate(r.getDate()-1);const l=s.toISOString().split("T")[0],h=yield o.supabaseService.checkIfDataExists("stock_data","industry",e,"date",l);if(console.log("Stock data for ",e," for date: ",l,". Dataexits: ",h),0==h){const y=yield(yield fetch("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&outputsize=compact&symbol="+e+"&apikey=CZMPMMVGN67FVB2W")).json();if("Thank you for using Alpha Vantage! Our standard API rate limit is 25 requests per day. Please subscribe to any of the premium plans at https://www.alphavantage.co/premium/ to instantly remove all daily rate limits."==y.Information)console.log("API limit reached");else{const u=y["Time Series (Daily)"];for(const d in u){const p=u[d];if(0==(yield o.supabaseService.checkIfDataExists("stock_data","industry",e,"date",d))){const A=parseFloat(p["4. close"]),v=parseFloat(p["5. volume"]);yield o.supabaseService.sendData("stock_data",e,d,A,v),console.log("Stock data sent to database for ",e," on ",d)}}}}}})()}static#t=this.\u0275fac=function(o){return new(o||a)(t.LFG(I.T))};static#e=this.\u0275prov=t.Yz7({token:a,factory:a.\u0275fac,providedIn:"root"})}return a})();function z(a,m){1&a&&(t.TgZ(0,"th",46),t._uU(1," Industry "),t.qZA())}function B(a,m){if(1&a){const e=t.EpF();t.TgZ(0,"td",47)(1,"button",48),t.NdJ("click",function(){const r=t.CHM(e).$implicit,s=t.oxw();return t.KtG(s.navigateToDashboard(r.industry,r.tableName))}),t._uU(2),t.qZA()()}if(2&a){const e=m.$implicit;t.xp6(2),t.hij(" ",e.industry," ")}}function E(a,m){1&a&&(t.TgZ(0,"th",46),t._uU(1," Mean Polarity "),t.qZA())}function Y(a,m){if(1&a&&(t.TgZ(0,"td",47)(1,"mat-icon",49),t._uU(2),t.qZA()()),2&a){const e=m.$implicit,o=t.oxw();t.xp6(1),t.Udp("color",o.checkPolarity(e.polarity).color),t.s9C("matTooltip",e.polarity.toFixed(3)),t.xp6(1),t.hij(" ",o.checkPolarity(e.polarity).sentiment," ")}}function L(a,m){1&a&&(t.TgZ(0,"th",46),t._uU(1," Articles Analysed "),t.qZA())}function q(a,m){if(1&a&&(t.TgZ(0,"td",47),t._uU(1),t.qZA()),2&a){const e=m.$implicit;t.xp6(1),t.hij(" ",e.numberOfArticles," ")}}function F(a,m){1&a&&t._UZ(0,"tr",50)}function Q(a,m){1&a&&t._UZ(0,"tr",51)}let R=(()=>{class a{constructor(e,o,n,r){this.supabaseService=e,this.router=o,this.dialog=n,this.stockDataService=r,this.industries=[],this.polarityChartData=[],this.stockChartData=[],this.tickerSymbols=[["CRWD","Crowdstrike"],["BRK.B","Berkshire Hathaway B"],["MSFT","Microsoft"],["BAYRY","Bayer AG"],["QQQ","Invesco QQQ Trust Series 1(Technology)"],["VGHCX","Vanguard Health Care Fund Investor Shares"],["XOP","SPDR S&P Oil & Gas Exploration & Production ETF "]],this.columnsToDisplay=["industry","polarity","numberOfArticles"],this.showXAxis=!0,this.showYAxis=!0,this.gradient=!1,this.showLegend=!0,this.legendPosition="below",this.showXAxisLabel=!0,this.xAxisLabel="Date",this.showYAxisLabel=!0,this.yAxisLabel="Polarity",this.timeline=!0}ngOnInit(){var e=this;return(0,w.Z)(function*(){yield e.getArticleData(),e.parseDataToTable(e.crowdstrikeData,e.berkshire_hathawayData,e.healthcare_industryData,e.microsoft,e.petroleum_industry,e.technology_industry,e.bayer),e.setPolarityChart(),yield e.updateStockData(),e.setStockChart()})()}getArticleData(){var e=this;return(0,w.Z)(function*(){e.crowdstrikeData=yield e.supabaseService.getData("crowdstrike"),e.berkshire_hathawayData=yield e.supabaseService.getData("berkshire_hathaway"),e.healthcare_industryData=yield e.supabaseService.getData("healthcare_industry"),e.microsoft=yield e.supabaseService.getData("microsoft"),e.petroleum_industry=yield e.supabaseService.getData("petroleum_industry"),e.technology_industry=yield e.supabaseService.getData("technology_industry"),e.bayer=yield e.supabaseService.getData("bayer"),e.industries.push([e.crowdstrikeData,"Crowdstrike"],[e.berkshire_hathawayData,"Berkshire Hathaway"],[e.healthcare_industryData,"Healthcare Industry"],[e.microsoft,"Microsoft"],[e.petroleum_industry,"Petroleum Industry"],[e.technology_industry,"Technology Industry"],[e.bayer,"Bayer AG"])})()}parseDataToTable(e,o,n,r,s,l,h){var f=this;return(0,w.Z)(function*(){let y=0;for(let i=0;i<e.length;i++)y+=e[i].polarity;const u=y/e.length;let d=0;for(let i=0;i<o.length;i++)d+=o[i].polarity;const p=d/o.length;let C=0;for(let i=0;i<n.length;i++)C+=n[i].polarity;const A=C/n.length;let v=0;for(let i=0;i<r.length;i++)v+=r[i].polarity;const X=v/r.length;let P=0;for(let i=0;i<s.length;i++)P+=s[i].polarity;const G=P/s.length;let T=0;for(let i=0;i<l.length;i++)T+=l[i].polarity;const J=T/l.length;let Z=0;for(let i=0;i<h.length;i++)Z+=h[i].polarity;f.parsedData=[{industry:"Crowdstrike",tableName:"crowdstrike",polarity:u,numberOfArticles:e.length},{industry:"Berkshire Hathaway",tableName:"berkshire_hathaway",polarity:p,numberOfArticles:o.length},{industry:"Healthcare Industry",tableName:"healthcare_industry",polarity:A,numberOfArticles:n.length},{industry:"Microsoft",tableName:"microsoft",polarity:X,numberOfArticles:r.length},{industry:"Petroleum Industry",tableName:"petroleum_industry",polarity:G,numberOfArticles:s.length},{industry:"Technology Industry",tableName:"technology_industry",polarity:J,numberOfArticles:l.length},{industry:"Bayer AG",tableName:"bayer",polarity:Z/h.length,numberOfArticles:h.length}],document.getElementById("table-spinner")?.style.setProperty("display","none"),document.getElementById("table")?.style.setProperty("display","")})()}navigateToDashboard(e,o){this.router.navigate(["dashboard",e,o])}navigateToNewsDashboard(){this.router.navigate(["newsdashboard"])}setPolarityChart(){let e=[];for(const r of this.industries){const s={name:r[1],series:[]},l=new Map;for(const u of r[0]){const d=new Date(u.published_at).toISOString().slice(0,10);l.has(d)||l.set(d,{totalPolarity:0,articleCount:0});let p=l.get(d);p.totalPolarity+=parseFloat(u.polarity),p.articleCount++}let h=0,f=0;const y=Array.from(l.keys()).sort();for(const u of y){const d=l.get(u);h+=d.totalPolarity,f+=d.articleCount;const p=h/f;s.series.push({name:new Date(u),value:p})}e.push(s)}this.polarityChartData=e,document.getElementById("polarity-chart-spinner")?.style.setProperty("display","none"),document.getElementById("polarity-chart")?.style.setProperty("display","flex")}setStockChart(){var e=this;return(0,w.Z)(function*(){let o=[];for(const s of e.tickerSymbols){const l={name:s[1],series:[]},h=yield e.supabaseService.getDataWithFilter("stock_data","industry",s[0]);for(const f of h)l.series.push({name:new Date(f.date),value:f.value});o.push(l)}e.stockChartData=o,document.getElementById("stock-chart-spinner")?.style.setProperty("display","none"),document.getElementById("stock-chart")?.style.setProperty("display","flex")})()}checkPolarity(e){let o,n;return e<-.1?(o="sentiment_dissatisfied",n="red"):e<.1?(o="sentiment_neutral",n="yellow"):e>.1?(o="sentiment_very_satisfied",n="green"):(o="undefined",n="black"),{sentiment:o,color:n}}updateStockData(){var e=this;return(0,w.Z)(function*(){for(const o of e.tickerSymbols)yield e.stockDataService.getStockData(o[0])})()}openDialog(){this.dialog.open(N)}static#t=this.\u0275fac=function(o){return new(o||a)(t.Y36(I.T),t.Y36(H.F0),t.Y36(b.uw),t.Y36(j))};static#e=this.\u0275cmp=t.Xpm({type:a,selectors:[["app-home"]],standalone:!0,features:[t.jDz],decls:88,vars:26,consts:[["name","viewport","content","width=device-width, initial-scale=1.0"],[2,"margin-top","1vh"],[1,"home-text"],[2,"width","40%","height","100%","display","flex","justify-content","center","align-items","center"],[1,"project-name"],[1,"development-text"],[1,"menu"],["mat-button","",3,"matMenuTriggerFor"],["menu","matMenu"],["mat-menu-item","",3,"click"],["mat-menu-item",""],[1,"whole-page"],[1,"button-container"],["mat-raised-button","",1,"info",2,"background-color","#1B1E27","color","white","font-size","large","padding","3vh","border-radius","1vh",3,"click"],[1,"help-icon"],[1,"chart-and-table"],[1,"two-chart-container"],[1,"chart-container"],[1,"chart-header"],[2,"font-size","xx-large","font-weight","500","padding-top","2vh","width","50%"],[2,"font-size","medium","width","30%","height","100%","display","flex","align-items","end"],[1,"material-symbols-outlined",2,"margin-left","5%"],["matTooltip"," Cumulative line chart or cumulative frequency chart, is a graphical representation that shows the cumulative sum or total of a series of values over time or another dimension."],["width","90%","color","#A8385D"],["id","polarity-chart-spinner",1,"chart-spinner"],["id","polarity-chart",1,"chart",2,"display","none"],[2,"fill","white",3,"scheme","results","gradient","xAxis","yAxis","legend","showXAxisLabel","showYAxisLabel","xAxisLabel","yAxisLabel","timeline"],["id","stock-chart-spinner",1,"chart-spinner"],["id","stock-chart",1,"chart",2,"display","none"],[1,"table-container",2,"display","flex","flex-direction","column"],["id","table","mat-table","",2,"background-color","#1B1E27","width","100%",3,"dataSource"],["matColumnDef","industry"],["mat-header-cell","",4,"matHeaderCellDef"],["mat-cell","","class","cell",4,"matCellDef"],["matColumnDef","polarity"],["matColumnDef","numberOfArticles"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],["id","table-spinner",1,"table-spinner"],[1,"bottom-toolbar"],[2,"display","flex","flex-direction","row","justify-content","center","align-items","center"],["target","\u201d_blank\u201d","href","https://github.com/Akukoskela/Investment-News-Aggregator-and-Analysis-Tool-project"],["width","98","height","96","xmlns","http://www.w3.org/2000/svg"],["fill-rule","evenodd","clip-rule","evenodd","d","M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z","fill","#fff"],["target","\u201d_blank\u201d","href","https://www.linkedin.com/in/aku-koskela-93179a234/",2,"margin-left","1vh"],["src","/assets/linkedin.png","alt","linkedin logo",1,"linkedin-image"],["mat-header-cell",""],["mat-cell","",1,"cell"],["mat-button","",1,"button",3,"click"],["id","sentiment-icon",1,"sentiment-icon",3,"matTooltip"],["mat-header-row",""],["mat-row",""]],template:function(o,n){if(1&o&&(t._UZ(0,"meta",0),t.TgZ(1,"mat-toolbar")(2,"span",1)(3,"h1",2),t._uU(4,"Home"),t.qZA()(),t.TgZ(5,"div",3)(6,"h1",4),t._uU(7,"Finance news collector"),t.qZA()(),t.TgZ(8,"div",5),t._uU(9,"In development"),t.qZA(),t.TgZ(10,"div",6)(11,"button",7)(12,"mat-icon"),t._uU(13,"menu"),t.qZA()(),t.TgZ(14,"mat-menu",null,8)(16,"button",9),t.NdJ("click",function(){return n.navigateToNewsDashboard()}),t._uU(17,"News dashboard"),t.qZA(),t.TgZ(18,"button",10),t._uU(19,"Item 2"),t.qZA()()()(),t.TgZ(20,"div",11)(21,"div",12)(22,"button",13),t.NdJ("click",function(){return n.openDialog()}),t._uU(23,"How does it work?"),t.TgZ(24,"mat-icon",14),t._uU(25,"help"),t.qZA()()(),t.TgZ(26,"div",15)(27,"div",16)(28,"div",17)(29,"div",18)(30,"h3",19),t._uU(31,"Polarity chart "),t.qZA(),t.TgZ(32,"p",20),t._uU(33,"Cumulative line chart "),t.TgZ(34,"span",21)(35,"mat-icon",22),t._uU(36,"info"),t.qZA()()()(),t._UZ(37,"hr",23)(38,"br"),t.TgZ(39,"div",24),t._UZ(40,"mat-spinner"),t.qZA(),t.TgZ(41,"div",25),t._UZ(42,"ngx-charts-line-chart",26),t.qZA()(),t._UZ(43,"br")(44,"br"),t.TgZ(45,"div",17)(46,"div",18)(47,"h3",19),t._uU(48,"Stock chart "),t.qZA(),t.TgZ(49,"p",20),t._uU(50,"Daily close values "),t.TgZ(51,"span",21)(52,"mat-icon"),t._uU(53,"info"),t.qZA()()()(),t._UZ(54,"hr",23)(55,"br"),t.TgZ(56,"div",27),t._UZ(57,"mat-spinner"),t.qZA(),t.TgZ(58,"div",28),t._UZ(59,"ngx-charts-line-chart",26),t.qZA()()(),t.TgZ(60,"div",29)(61,"table",30),t.ynx(62,31),t.YNc(63,z,2,0,"th",32),t.YNc(64,B,3,1,"td",33),t.BQk(),t.ynx(65,34),t.YNc(66,E,2,0,"th",32),t.YNc(67,Y,3,4,"td",33),t.BQk(),t.ynx(68,35),t.YNc(69,L,2,0,"th",32),t.YNc(70,q,2,1,"td",33),t.BQk(),t._UZ(71,"hr",23),t.YNc(72,F,1,0,"tr",36),t.YNc(73,Q,1,0,"tr",37),t.qZA(),t.TgZ(74,"div",38),t._UZ(75,"mat-spinner"),t.qZA()()(),t.TgZ(76,"mat-toolbar",39)(77,"div",40)(78,"p"),t._uU(79,"Source code:"),t.qZA(),t.TgZ(80,"a",41),t.O4$(),t.TgZ(81,"svg",42),t._UZ(82,"path",43),t.qZA()()(),t.kcU(),t.TgZ(83,"div",40)(84,"p"),t._uU(85,"Developer:"),t.qZA(),t.TgZ(86,"a",44),t._UZ(87,"img",45),t.qZA()()()()),2&o){const r=t.MAs(15);t.xp6(11),t.Q6J("matMenuTriggerFor",r),t.xp6(31),t.Q6J("scheme","cool")("results",n.polarityChartData)("gradient",n.gradient)("xAxis",n.showXAxis)("yAxis",n.showYAxis)("legend",n.showLegend)("showXAxisLabel",n.showXAxisLabel)("showYAxisLabel",n.showYAxisLabel)("xAxisLabel",n.xAxisLabel)("yAxisLabel",n.yAxisLabel)("timeline",n.timeline),t.xp6(17),t.Q6J("scheme","cool")("results",n.stockChartData)("gradient",n.gradient)("xAxis",n.showXAxis)("yAxis",n.showYAxis)("legend",n.showLegend)("showXAxisLabel",n.showXAxisLabel)("showYAxisLabel",n.showYAxisLabel)("xAxisLabel",n.xAxisLabel)("yAxisLabel",n.yAxisLabel)("timeline",n.timeline),t.xp6(2),t.Q6J("dataSource",n.parsedData),t.xp6(11),t.Q6J("matHeaderRowDef",n.columnsToDisplay),t.xp6(1),t.Q6J("matRowDefColumns",n.columnsToDisplay)}},dependencies:[g.p0,g.BZ,g.fO,g.as,g.w1,g.Dz,g.nj,g.ge,g.ev,g.XQ,g.Gk,_.ot,_.lW,D.g0,D.Ye,k.a4,k.Dw,M.Ps,M.Hw,S.AV,S.gM,U.Cq,U.Ou,b.Is,x.Tx,x.VK,x.OP,x.p6],styles:["mat-toolbar[_ngcontent-%COMP%]{height:11vh;display:flex;flex-direction:row;background-color:#1b1e27;color:#fff;border-bottom:solid;border-color:#a8385d;border-bottom-width:.3vh;justify-content:space-between}.development-text[_ngcontent-%COMP%]{display:flex;color:red;font-size:1.4vw}.home-text[_ngcontent-%COMP%]{font-weight:450;font-size:1.7vw}.button-container[_ngcontent-%COMP%]{display:flex;justify-content:center;margin-top:5vh}.button-container[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover{background-color:#a8385d!important}.help-icon[_ngcontent-%COMP%]{padding-right:1vh;transform:scale(1.8)}body[_ngcontent-%COMP%]{background-color:#2f3646}.project-name[_ngcontent-%COMP%]{display:flex;margin-top:1vh;font-weight:450;font-size:2vw;width:70%;white-space:wrap;line-height:2vh}.whole-page[_ngcontent-%COMP%]{display:flex;align-items:center;flex-direction:column;background-color:#2f3646;height:auto}.table-container[_ngcontent-%COMP%]{display:flex;justify-content:center;width:40%;height:-moz-fit-content;height:fit-content;background-color:#1b1e27;border-radius:1vh;padding:4vh;box-shadow:0 0 10px #00000080}.table-container[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{border-bottom:solid;border-color:#a8385d}.table-spinner[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;margin-top:25%}th[_ngcontent-%COMP%]{color:#fff}td[_ngcontent-%COMP%]{border-bottom:solid}.cell[_ngcontent-%COMP%]{font-size:1rem;padding:3.5vh;font-weight:450;color:#fff}th[_ngcontent-%COMP%]{font-size:x-large}.button[_ngcontent-%COMP%]:hover{background-color:#fff;color:#000!important}.button[_ngcontent-%COMP%]{font-size:1rem;color:#fff!important;border-radius:1vh;padding:1.5vh;width:-moz-fit-content;width:fit-content;text-decoration:underline}p[_ngcontent-%COMP%]{line-height:1.6}.chart-and-table[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:space-around;width:95%;margin-top:2vh;margin-bottom:10vh}.two-chart-container[_ngcontent-%COMP%]{display:flex;flex-direction:column;width:60%;justify-content:space-between}.chart-header[_ngcontent-%COMP%]{width:90%;display:flex;justify-content:space-around;align-items:center;margin-top:2%;color:#fff;font-size:large}.chart-spinner[_ngcontent-%COMP%]{display:flex;justify-content:center;margin-top:22%}.chart-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin-top:1%;margin-right:2%;display:flex;justify-content:center;align-items:center}.chart-container[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;width:95%;height:70vh;background-color:#1b1e27;border-radius:1vh;box-shadow:0 0 10px #0000004d;color:gray}.chart[_ngcontent-%COMP%]{display:flex;width:100%;height:90%}.bottom-toolbar[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:space-around}.linkedin-image[_ngcontent-%COMP%]{width:20%}.linkedin-image[_ngcontent-%COMP%]:hover{transition:all .2s ease-in-out;transform:scale(.9)}svg[_ngcontent-%COMP%]:hover{transition:all .2s ease-in-out;transform:scale(.6)}svg[_ngcontent-%COMP%]{transform:scale(.7)}.sentiment-icon[_ngcontent-%COMP%]{transform:scale(1.5)}@media (max-width:1170px){.home-text[_ngcontent-%COMP%]{font-weight:450;font-size:3vw}.development-text[_ngcontent-%COMP%]{display:flex;color:red;font-size:1.7vw}.project-name[_ngcontent-%COMP%]{display:flex;margin-top:1vh;font-weight:450;font-size:3vw;width:70%;white-space:wrap;line-height:3vh}.chart-and-table[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:space-around;width:100%;margin-top:5vh;margin-bottom:10vh;align-items:center}.two-chart-container[_ngcontent-%COMP%]{display:flex;flex-direction:column;width:100%;justify-content:space-between;align-items:center}.chart-container[_ngcontent-%COMP%]{display:flex;width:86%;height:70vh;background-color:#1b1e27;border-radius:1vh;box-shadow:0 0 10px #0000004d;color:gray;margin-bottom:4vh}.chart-header[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;margin-top:2%;color:#fff;font-size:large}.chart-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin-top:1%;margin-right:2%;display:flex;justify-content:center;align-items:center}.table-container[_ngcontent-%COMP%]{display:flex;width:80%;background-color:#1b1e27;border-radius:1vh;padding:4vh;box-shadow:0 0 10px #00000080;font-size:small}}@media (max-width:750px){.project-name[_ngcontent-%COMP%]{display:flex;margin-top:1vh;font-weight:450;font-size:3vw;width:70%;white-space:wrap;line-height:2vh}.chart[_ngcontent-%COMP%]{display:flex;width:100%;height:75%}.development-text[_ngcontent-%COMP%]{display:flex;color:red;font-size:3vw}.cell[_ngcontent-%COMP%]{font-size:.8rem;padding:3.5vh;font-weight:450;color:#fff}.button[_ngcontent-%COMP%]:hover{background-color:#fff;color:#000!important}.button[_ngcontent-%COMP%]{font-size:.8rem;color:#fff!important;border-radius:1vh;padding:1.5vh;width:-moz-fit-content;width:fit-content}th[_ngcontent-%COMP%]{font-size:medium}.bottom-toolbar[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:small}.linkedin-image[_ngcontent-%COMP%]{width:20%}svg[_ngcontent-%COMP%]{transform:scale(.5)}}"]})}return a})()}}]);