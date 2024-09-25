import { Component, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { SupabaseService } from 'src/app/services/supabase.service';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgFor } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonToggleChange, MatButtonToggleGroup, MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { ArticlePopupWindowComponent } from './article-popup-window/article-popup-window.component';
import { checkPolarity } from 'src/app/app.component';



@Component({
  standalone: true,
  selector: 'app-newsdashboard',
  templateUrl: './newsdashboard.component.html',
  styleUrls: ['./newsdashboard.component.css'],
  imports: [ReactiveFormsModule, FormsModule, MatSelectModule, MatFormFieldModule, CommonModule, MatToolbarModule, NgFor, MatTableModule, MatButtonModule, NgxChartsModule, MatIconModule, MatTooltipModule, MatProgressSpinnerModule, MatDialogModule, MatButtonToggleModule, MatMenuModule,]
})
export class NewsdashboardComponent {
  articles: any = []
  industries = ['crowdstrike', 'bayer', 'berkshire_hathaway', 'healthcare_industry', 'technology_industry', 'microsoft', 'petroleum_industry']
  crowdstrikeArticles: any;
  bayerArticles: any;
  berkshire_hathawayArticles: any;
  healthcare_industryArticles: any;
  technology_industryArticles: any;
  microsoftArticles: any;
  petroleum_industryArticles: any;
  showArticles: any;
  currentArticles: any;
  filteredArticles: any;
  testData: any;
  imageNotAvailableImage = 'assets/no-image-available-image.jpg';
  choosedIndustry: any;
  crowdstrikeLoading: boolean = true;
  microsoftLoading: boolean = true;
  bayerLoading: boolean = true;
  berkshireLoading: boolean = true;
  healthcareLoading: boolean = true;
  technologyLoading: boolean = true;
  petroleumLoading: boolean = true;
  loading: boolean = true;
  filterSelector = new FormControl();
  positiveSelected: boolean = false;
  negativeSelected: boolean = false;
  constructor(public dialog: MatDialog, private supabaseService: SupabaseService, private route: ActivatedRoute, private router: Router) { }

  async ngOnInit() {
    await this.loadingArticles();


    this.choosedIndustry = 'Crowdstrike';
    this.crowdstrikeLoading = false;

    /*this.testData = [
      {
        "id": "335426c9-881d-4ed1-ab50-ca5766c2a50c",
        "published_at": "2024-07-21",
        "polarity": 0.8,
        "url": "https://biztoc.com/x/24acb3f665dca50c",
        "image_url": "https://biztoc.com/cdn/800/og.png",
        "source_name": "Biztoc.com",
        "description": "CrowdStrike Holdings (NASDAQ: CRWD) made headlines around the world on Friday -- but not for a reason the company or its shareholders were happy about. A faulty software update by the cybersecurity specialist led to an IT outage that impacted customers around…",
        "content": "CrowdStrike Holdings (NASDAQ: CRWD) made headlines around the world on Friday -- but not for a reason the company or its shareholders were happy about. A faulty software update by the cybersecurity specialist led to an IT outage that impacted customers around the world, from airlines to…\n\nThis story appeared on finance.yahoo.com , 2024-07-21.",
        "title": "After the Biggest IT Outage in History, Is CrowdStrike a Stock to Avoid...or a Bad-News Buy?",
        "subjectivity": 1,
        "info": null
      },
      {
        "id": "a1a4d2c8-ee57-4d84-a795-0c35ad008346",
        "published_at": "2024-07-23",
        "polarity": 0.75,
        "url": "https://www.doctorofcredit.com/targeted-amex-offer-crowdstrike-get-40-back/",
        "image_url": "https://www.doctorofcredit.com/wp-content/uploads/2020/05/amex-offer-1.png",
        "source_name": "Doctorofcredit.com",
        "description": "Get 40% back as a statement credit by using your enrolled eligible Card to make purchases online at crowdstrike.com/offer by 9/28/2024",
        "content": "You can help support this site by using our links to Amazon & eBay.\n\n\n\n\n\nAs an Amazon Associate I earn from qualifying purchases. Keep in mind that if you do use our links, you won’t be able to earn cash back/miles/points from shopping portals.\n\nIn the interests of our readers you can find out what shopping portal is offering the best rates on eBay here & Amazon here.",
        "title": "[Targeted] AmEx Offer: Crowdstrike, Get 40% Back",
        "subjectivity": 0.4625,
        "info": null
      },
      {
        "id": "e238da48-d2cd-440f-a6ab-bced83967711",
        "published_at": "2024-06-05",
        "polarity": 0.5833333333333334,
        "url": "https://biztoc.com/x/77ca127cea23f4ff",
        "image_url": "https://c.biztoc.com/p/77ca127cea23f4ff/s.webp",
        "source_name": "Biztoc.com",
        "description": "Good day, everyone, and thank you for standing by. Welcome to CrowdStrike fiscal first quarter 2025 results conference call. At this time, all participants are in a listen-only mode. After the speakers' presentation, there will be a question-and-answer sessio…",
        "content": "Good day, everyone, and thank you for standing by. Welcome to CrowdStrike fiscal first quarter 2025 results conference call. At this time, all participants are in a listen-only mode. After the speakers' presentation, there will be a question-and-answer session.\n\n[Operator instructions] Please be advised that today's conference is being recorded. I would now like to hand it…\n\nThis story appeared on aol.com",
        "title": "Q1 2025 Earnings Call Transcript",
        "subjectivity": 0.611111111111111,
        "info": null
      },
      {
        "id": "fce33039-f0ab-4f19-93fc-7c4b5a28a4db",
        "published_at": "2024-06-05",
        "polarity": 0.5,
        "url": "https://biztoc.com/x/774b60beb90a1ae3",
        "image_url": "https://c.biztoc.com/274/og.png",
        "source_name": "Biztoc.com",
        "description": "Hewlett Packard, CrowdStrike and more in the latest Market Talks covering Technology, Media and Telecom. #hewlettpackard #crowdstrike #markettalks #telecom",
        "content": "Hewlett Packard, CrowdStrike and more in the latest Market Talks covering Technology, Media and Telecom.\n\nThis story appeared on wsj.com , 2024-06-05.",
        "title": "Tech, Media & Telecom Roundup: Market Talk",
        "subjectivity": 0.7,
        "info": null
      },
      {
        "id": "e3d9831c-47e0-4f58-abf5-583c1db7aebe",
        "published_at": "2024-06-10",
        "polarity": 0.5,
        "url": "https://biztoc.com/x/1e8580cb3e2430d1",
        "image_url": "https://biztoc.com/cdn/799/og.png",
        "source_name": "Biztoc.com",
        "description": "Nvidia, AMD, Southwest, GameStop, Apple, CrowdStrike, Diamond Offshore, and More Market Movers Barron's\nStocks making the biggest moves midday: LUV, GME, AMD CNBC\nStocks to Watch Monday: Nvidia, Apple, AMD, Southwest Airlines The Wall Street Journal\nMidday mo…",
        "content": "Nvidia, AMD, Southwest, GameStop, Apple, CrowdStrike, Diamond Offshore, and More Market Movers Barron's\n\nStocks making the biggest moves midday: LUV, GME, AMD CNBC\n\nStocks to Watch Monday: Nvidia, Apple, AMD, Southwest Airlines The Wall Street Journal\n\nMidday movers: Southwest Airlines,…\n\nThis story appeared on barrons.com , 2024-06-10.",
        "title": "Nvidia, AMD, Southwest, GameStop, Apple, CrowdStrike, Diamond Offshore, and More Market Movers",
        "subjectivity": 0.5,
        "info": null
      }
    ]*/
  }

  sources = new FormControl('');
  sourceList: string[] = [

    '9to5google.com', '9to5Mac', 'ABC News', 'Abduzeedo.com', 'Acecomments.mu.nu', 'Activistpost.com', 'Adafruit.com', 'AdExchanger', 'Adweek', 'Aero-news.net', 'Ahouseinthehills.com', 'Al Jazeera English', 'AllAfrica - Top Africa News', 'Amarillo.com', 'Amazon.com', 'Ambcrypto.com', 'Americanthinker.com', 'AnandTech', 'Android Authority', 'Android Central', 'Android Headlines', 'AndroidGuys', 'Antaranews.com', 'AOL', 'AppleInsider', 'ArchDaily', 'Archinect', 'Ars Technica', 'Askubuntu.com', 'Associated Press', 'Atxjetsetter.com', 'Audioholics', 'Autocar', 'Autoblog', 'autosport.com', 'Bangkok Post', 'BBC News', 'Bengreenfieldlife.com', 'Benzinga', 'Berthub.eu', 'BetaNews', 'Bitcoinist', 'Bitpipe.com', 'Bitrebels.com', 'Bitsaboutmoney.com', 'Biztoc.com', 'Blog.google', 'Blogger.com', 'Bloguismo.com', 'Bloomberg', 'Boardingarea.com', 'Boredpanda.com', 'Boston Herald', 'Breitbart News', 'Briansolis.com', 'Business Insider', 'Business Standard', 'Business Today', 'BusinessLine', 'C-sharpcorner.com', 'Carriermanagement.com', 'CBS News', 'CBC News', 'Chriskresser.com', 'Cisco.com', 'Cisa.gov', 'Civil Eats', 'CleanTechnica', 'Clinical Trials Arena', 'cloud.feedly.com', 'Cloudflare.com', 'Cloudtweaks.com', 'CNA', 'CNBC', 'CNX Software', 'CNN', 'CoinDesk', 'ComputerWeekly.com', 'Computerworld', 'Commonsensewithmoney.com', 'Common Dreams', 'Cool Hunting', 'Core77.com', 'CounterPunch', 'Cracked.com', 'Creative Bloq', 'Crikey', 'Crooksandliars.com', 'Crowdstrike.com', 'CryptoGlobe', 'CryptoSlate', 'Cult of Mac', 'Cwa.me.uk', 'Daemonology.net', 'Daily Beast', 'Daily Post Nigeria', 'Daily Signal', 'Databricks.com', 'Dataversity.net', 'Dazed', 'Deadline', 'Dealcatcher.com', 'Des Moines Register', 'Design-milk.com', 'Designtaxi.com', 'DevOps.com', 'Dezeen', 'Dianeravitch.net', 'Digiday', 'Digital Journal', 'Digital Trends', 'DigitalCommerce360', 'Digitimes', 'DIYphotography', 'Dnyuz.com', 'Dpreview.com', 'DW (English)', 'Dzone.com', 'Eater', 'Economictimes.com', 'Eia.gov', 'Elearningindustry.com', 'Electrek', 'Electronics-lab.com', 'Elliott.org', 'Elon Musk (X)', 'Energycentral.com', 'Energyskeptic.com', 'Engadget', 'ESPN', 'ETF Daily News', 'EURACTIV', 'Eurogamer.net', 'ExchangeWire', 'Exxonknews.org', 'FactCheck.org', 'Fairbanks Daily News-Miner', 'Fark.com', 'FDA.gov', 'Finextra', 'Finovate.com', 'Foreign Policy', 'Forrester.com', 'Fortune', 'Fox News', 'Freerepublic.com', 'Fstoppers', 'Gadget Flow', 'Gadgets360.com', 'GameSpot', 'GamesIndustry.biz', 'GamesRadar+', 'gcaptain.com', 'Geeky Gadgets', 'Geeksaresexy.net', 'Gematsu', 'Ghacks Technology News', 'Gigaom.com', 'Github.blog', 'Github.com', 'Giveawayoftheday.com', 'Gizchina.com', 'Gizmodo.com', 'GlobeNewswire', 'Globalsecurity.org', 'Globalresearch.ca', 'Goodereader', 'Grist', 'GSMArena.com', 'HackRead', 'Hackaday', 'Hacker News', 'Harvard Business Review', 'Harvard School of Engineering and Applied Sciences', 'Hbs.edu', 'Healthcare IT News', 'Healthcaredive.com', 'Healthsystemcio.com', 'heise online', 'Help Net Security', 'Highsnobiety', 'Histalk2.com', 'Hollywood Reporter', 'Hospitality Net', 'Hospitalmanagement.net', 'HuffPost', 'Hubspot.com', 'Hurriyet Daily News', 'HYPEBEAST', 'Idownloadblog.com', 'IGN', 'iLounge', 'iMore', 'Independent.ie', 'IndieWire', 'InfoQ.com', 'Infosecurity Magazine', 'Inman', 'Inside the Magic', 'Insurance Journal', 'Intego.com', 'Internet', 'Investingcube.com', 'Investing.com', 'InvestorsObserver', 'Investopedia', 'iPhone in Canada', 'iTnews', 'Itsfoss.com', 'Izismile.com', 'Jalopnik', 'Japan Today', 'Javacodegeeks.com', 'Jeffbullas.com', 'Juancole.com', 'just-food.com', 'just-style.com', 'Kdnuggets.com', 'Kevinmd.com', 'Kffhealthnews.org', 'Khabarhub.com', 'KicksOnFire.com', 'Kotaku', 'Krebs on Security', 'Lawyersgunsmoneyblog.com', 'Leanblog.org', 'Learncodethehardway.com', 'Legalinsurrection.com', 'Lemis.com', 'Lewrockwell.com', 'Libsyn.com', 'Lifedev.net', 'Lifeinsuranceinternational.com', 'Liliputing', 'Live Science', 'Liveandletsfly.com', 'Livedoor.com', 'Livemint', 'Los Angeles Times', 'Luxuo.com', 'Lwn.net', 'Macdailynews.com', 'MacRumors', 'Macsparkyfederated.social', 'Mactrast.com', 'Macworld', 'Maketecheasier.com', 'Malwarebytes.com', 'MarketingProfs.com', 'MarketScreener.com', 'MarketWatch', 'Martech.zone', 'Mckinsey.com', 'Mediagazer.com', 'Mediaite', 'MediaNama.com', 'Medical Device Network', 'MedCity News', 'Medium', 'Mental Floss', 'Metafilter.com', 'Microsoft.com', 'Milwaukee Journal Sentinel', 'Mining Technology', 'Minneapolis Star Tribune', 'MIT Technology Review', 'Mit.edu', 'MobiHealthNews', 'Mobile Syrup', 'Mongodb.com', 'Moneycontrol', 'Motorfinanceonline.com', 'Motley Fool Australia', 'MSNBC', 'Mssqltips.com', 'MSPoweruser', 'My Nintendo News', 'Mymoneyblog.com', 'Nakedcapitalism.com', 'NASA', 'Nation.africa', 'National Observer', 'Naturalnews.com', 'NBC News', 'NDTV News', 'Neowin', 'NerdWallet', 'New Atlas', 'New Scientist', 'New York Magazine', 'New York Post', 'New Zealand Herald', 'newsBTC', 'Newser', 'Nextbigwhat.com', 'Nextgov', 'Nextpit.com', 'Nlppeople.com', 'Noemamag.com', 'Nofilmschool.com', 'Noupe.com', 'NPR', 'Nvidia.com', 'Observer', 'Offshore Technology', 'OilPrice.com', 'Om.co', 'Omgubuntu.co.uk', 'Order-order.com', 'Osnews.com', 'Ozbargain.com.au', 'Packetpushers.net', 'Packetstormsecurity.com', 'Paddle Your Own Kanoo', 'Palm Beach Post', 'Paloaltonetworks.com', 'Paul Tan\'s Automotive News', 'PBS', 'PC Gamer', 'PC Perspective', 'PCMag.com', 'PCWorld', 'PetaPixel', 'Pharmaceutical Technology', 'Phoronix', 'Phys.Org', 'PlayStation LifeStyle', 'Plos.org', 'Politicopro.com', 'Polygon', 'Popular Science', 'Portable Apps', 'Poynter', 'Power Technology', 'PR Daily', 'PR Newswire UK', 'Project Syndicate', 'ProPublica', 'Prtimes.jp', 'Psychology Today', 'pymnts.com', 'Pypi.org', 'Quartz India', 'Ragan.com', 'R-bloggers.com', 'Radaronline.com', 'ReadWrite', 'Reason', 'redmondpie.com', 'Resilience', 'Researchbuzz.me', 'Restofworld.org', 'Richmond.com', 'Rigzone', 'Risky.biz', 'Ritholtz.com', 'Rlsbb.cc', 'Roanoke Times', 'Robb Report', 'Rock Paper Shotgun', 'Rolling Stone', 'Royal Society of Chemistry', 'RT', 'Saastr.com', 'Samsung.com', 'SamMobile', 'SC Magazine', 'Schneier.com', 'Sciencebasedmedicine.org', 'Scientific American', 'Seclists.org', 'Securityaffairs.com', 'Securityintelligence.com', 'Semrush.com', 'Seths.blog', 'Shtfplan.com', 'Singularity Hub', 'Skift', 'Sky.com', 'Slashdot.org', 'Slickdeals.net', 'Small Business Trends', 'Smartdatacollective.com', 'Sneaker News', 'Snopes.com', 'Socialmediaexaminer.com', 'Softantenna.com', 'Soundonsound.com', 'Sourcing Journal', 'SoyaCincau.com', 'Space.com', 'Springwise.com', 'Sproutsocial.com', 'Sqlservercentral.com', 'Stanford.edu', 'Steveblank.com', 'Storagereview.com', 'Stratechery.com', 'Substack.com', 'Techemails.com', 'TechCrunch', 'Techdirt', 'TechNewsWorld', 'TechNode', 'Techpowerup.com', 'TechRadar', 'Techreport.com', 'TechSpot', 'Techviral.net', 'Techrights.org', 'Techtarget.com', 'The American Conservative', 'The Atlantic', 'The BMJ', 'The Boston Globe', 'The Conversation Africa', 'The Daily Caller', 'The Daily Dot', 'The Daily Hodl', 'The Denver Post', 'The Diplomat', 'The Drum', 'The Economist', 'The Fly', 'The Guardian', 'The Hacker News', 'The Hill', 'The Indian Express', 'The Intercept', 'The Irish Times', 'The Japan Times', 'The Jerusalem Post', 'The Mac Observer', 'The National Interest', 'The New Republic', 'The New Yorker', 'The Next Web', 'The Online Citizen', 'The Points Guy', 'The Punch', 'The Quietus', 'The Register', 'The Star Online', 'The Sun', 'The Times of India', 'The Verge', 'The Washington Post', 'The Week Magazine', 'The-sun.com', 'Thebulkheadseat.com', 'Thechronicle.com.gh', 'Theepochtimes.com', 'Thegatewaypundit.com', 'Thehillstimes.in', 'Theinventory.com', 'Thenation.com', 'TheWrap', 'Thewindowsclub.com', 'Thurrott.com', 'Time', 'Tistory.com', 'TomHardware UK', 'Toprankmarketing.com', 'Torrentfreak.com', 'Trendingger.com', 'Trendhunter.com', 'Truthout', 'TweakTown', 'Typeforyou.org', 'Uxdesign.cc', 'UPI.com', 'Upenn.edu', 'USA Today', 'ValueWalk', 'Variety', 'Verdict', 'VentureBeat', 'Viewfromthewing.com', 'Vmblog.com', 'VOA News', 'Vox', 'Wattsupwiththat.com', 'Wccftech', 'Windows Central', 'Windows.com', 'Wired', 'Wnd.com', 'World Construction Network', 'Wowebook.org', 'WWD', 'www.yahoo.com', 'Yanko Design', 'Yoast.com', 'ZDNet']

  async loadingArticles() { // Getting data with filters because it may be faster than getting all the unnecessary data all at once.
    this.choosedIndustry = 'Crowdstrike';
    this.crowdstrikeArticles = await this.supabaseService.getDataWithFilters('crowdstrike', 'published_at,polarity,url,image_url,source_name,description,content,title');
    this.crowdstrikeLoading = false;
    this.currentArticles = this.crowdstrikeArticles;
    this.showArticles = this.currentArticles.slice(0, 20);
    this.microsoftArticles = await this.supabaseService.getDataWithFilters('microsoft', 'published_at,polarity,url,image_url,source_name,description,content,title');
    this.microsoftLoading = false;
    this.bayerArticles = await this.supabaseService.getDataWithFilters('bayer', 'published_at,polarity,url,image_url,source_name,description,content,title');
    this.bayerLoading = false;
    this.berkshire_hathawayArticles = await this.supabaseService.getDataWithFilters('berkshire_hathaway', 'published_at,polarity,url,image_url,source_name,description,content,title');
    this.berkshireLoading = false;
    this.healthcare_industryArticles = await this.supabaseService.getDataWithFilters('healthcare_industry', 'published_at,polarity,url,image_url,source_name,description,content,title');
    this.healthcareLoading = false;
    this.technology_industryArticles = await this.supabaseService.getDataWithFilters('technology_industry', 'published_at,polarity,url,image_url,source_name,description,content,title');
    this.technologyLoading = false;
    this.petroleum_industryArticles = await this.supabaseService.getDataWithFilters('petroleum_industry', 'published_at,polarity,url,image_url,source_name,description,content,title');
    this.petroleumLoading = false;
    console.log('all ready')
    //this.loading=false;
  }

  navigateToHome() {
    this.router.navigate(['home']);
  }

  shorteningFunc(string: string, length: number) {
    if (string == null) {
      return '';
    }
    if (string.length > length) {
      return string.substring(0, length) + '...';
    }
    else {
      return string;
    }
  }

  showAlternativeImage(event: Event) {
    (event.target as HTMLImageElement).src = this.imageNotAvailableImage;

  }

  checkPolarity(polarity: number) {
    return checkPolarity(polarity)
  }



  selectIndustry(event: any) {
    this.choosedIndustry = event.value;
    switch (this.choosedIndustry) {
      case 'Crowdstrike':
        this.loading = this.crowdstrikeLoading
        if (this.loading == true) { //If articles is still loading we don't want to use slice method because it gives error message to console.
        }
        else {
          this.currentArticles = this.crowdstrikeArticles;
          this.showArticles = this.currentArticles.slice(0, 20)
        }
        break;
      case 'Bayer':
        this.loading = this.bayerLoading
        if (this.loading == true) {
        }
        else {
          this.currentArticles = this.bayerArticles;
          this.showArticles = this.currentArticles.slice(0, 20)
        }
        break;
      case 'Berkshire Hathaway':
        this.loading = this.berkshireLoading
        if (this.loading == true) {
        }
        else {
          this.currentArticles = this.berkshire_hathawayArticles;
          this.showArticles = this.currentArticles.slice(0, 20)
        }
        break;
      case 'Healthcare industry':
        this.loading = this.healthcareLoading
        if (this.loading == true) {
        }
        else {
          this.currentArticles = this.healthcare_industryArticles;
          this.showArticles = this.currentArticles.slice(0, 20)
        }
        break;
      case 'Technology industry':
        this.loading = this.technologyLoading
        if (this.loading == true) {
        }
        else {
          this.currentArticles = this.technology_industryArticles;
          this.showArticles = this.currentArticles.slice(0, 20)
        }
        break;
      case 'Microsoft':
        this.loading = this.microsoftLoading
        if (this.loading == true) {
        }
        else {
          this.currentArticles = this.microsoftArticles;
          this.showArticles = this.currentArticles.slice(0, 20)
        }
        break;
      case 'Petroleum industry':
        this.loading = this.petroleumLoading
        if (this.loading == true) {
        }
        else {
          this.currentArticles = this.petroleum_industryArticles;
          this.showArticles = this.currentArticles.slice(0, 20)
        }
        break;
    }
    console.log(this.choosedIndustry, ' is loading: ', this.loading)
  }

  loadMoreArticles() {
    const numberOfArticles = this.showArticles.length;

    this.showArticles = this.filteredArticles.slice(0, numberOfArticles + 20);

    /*

    switch (this.choosedIndustry) {
      case 'Crowdstrike':
        this.showArticles = this.crowdstrikeArticles.slice(0, numberOfArticles + 20)
        break;
      case 'Bayer':
        this.showArticles = this.bayerArticles.slice(0, numberOfArticles + 20)
        break;
      case 'Berkshire Hathaway':
        this.showArticles = this.berkshire_hathawayArticles.slice(0, numberOfArticles + 20)
        break;
      case 'Healthcare industry':
        this.showArticles = this.healthcare_industryArticles.slice(0, numberOfArticles + 20)
        break;
      case 'Technology industry':
        this.showArticles = this.technology_industryArticles.slice(0, numberOfArticles + 20)
        break;
      case 'Microsoft':
        this.showArticles = this.microsoftArticles.slice(0, numberOfArticles + 20)
        break;
      case 'Petroleum industry':
        this.showArticles = this.petroleum_industryArticles.slice(0, numberOfArticles + 20)
        break;
    }
        */
  }

  positiveClicked() {
    if (this.positiveSelected == false) {
      this.positiveSelected = true;
    }
    else {
      this.positiveSelected = false
    }
  }

  negativeClicked() {
    if (this.negativeSelected == false) {
      this.negativeSelected = true;
    }
    else {
      this.negativeSelected = false
    }
  }

  search() {
    const filterSelectorValue = this.filterSelector.value;
    const numberOfArticles = this.showArticles.length;
    let articles: any;

    // KESKEN SAFVUPIOSASHSEUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU KESKEN
    if (filterSelectorValue.includes('latest') && filterSelectorValue.includes('positive')) {
      this.filteredArticles = this.currentArticles.filter((a: any) => a.polarity > 0.1).sort((a: any, b: any) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());
      this.showArticles = this.filteredArticles.slice(0, 20);
      console.log(this.showArticles)
      console.log('Showing latest positive articles')
    }
    else if (filterSelectorValue.includes('latest') && filterSelectorValue.includes('negative')) {
      this.filteredArticles = this.currentArticles.filter((a: any) => a.polarity < -0.1).sort((a: any, b: any) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());
      this.showArticles = this.filteredArticles.slice(0, 20);
      console.log(this.showArticles)
      console.log('showing latest negative articles')
    }
    else if (filterSelectorValue.includes('latest')) {
      this.filteredArticles = this.currentArticles.sort((a: any, b: any) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());
      this.showArticles = this.filteredArticles.slice(0, 20);
      console.log(this.showArticles)
    }
    else if (filterSelectorValue.includes('positive')) {
      this.filteredArticles = this.currentArticles.filter((a: any) => a.polarity > 0.1).sort((a: any, b: any) => b.polarity - a.polarity);
      this.showArticles = this.filteredArticles.slice(0, 20);
      console.log(this.showArticles)
      console.log('showing positive articles')
    }
    else if (filterSelectorValue.includes('negative')) {
      this.filteredArticles = this.currentArticles.filter((a: any) => a.polarity < -0.1).sort((a: any, b: any) => b.polarity - a.polarity);
      this.showArticles = this.filteredArticles.slice(0, 20);
      console.log(this.showArticles)
      console.log('showing negative articles')
    }
    console.log(this.filterSelector.value)
  }

  openArticlePopupwindow(article: any) {
    console.log(article)

    const dialogRef = this.dialog.open(ArticlePopupWindowComponent, {
      data: { title: article.title, description: article.description, content: article.content, sourceName: article.source_name, publishedAt: article.published_at, imageUrl: article.image_url, url: article.url, polarity: article.polarity }, width: '70%'
    });

  }

  /*async getNews() {
    // Using supabaseService to get news/articles from database
    this.articles = await this.supabaseService.getData(this.tableName);
    this.numberOfArticles = this.articles.length

    // Setting up the polarity of industry
    let sum: any = 0
    for (let i = 0; i < this.articles.length; i++) {
      sum = sum + this.articles[i].polarity
    }
    const polarity = sum / this.articles.length
    this.polarity = polarity.toFixed(4)

    // Setting up top 5 good and bad news
    this.top5GoodArticles = await this.supabaseService.getTop5GoodNews(this.tableName);
    this.top5BadArticles = await this.supabaseService.getTop5BadNews(this.tableName);
  }*/
}
