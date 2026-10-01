export type Variant={id:string;name:string;shape:string;color:string;quantity:number};
export type ListingPhoto={id:string;url:string;alt:string;variantId?:string};
export type Item={id:string;name:string;description:string;kind:"item"|"raffle"|"soon";price:number;bundle:number;largePrice:number;largeBundle:number;published:boolean;image:string;images?:ListingPhoto[];variants:Variant[];ends:string};
export type RequestLine={variantId:string;variantName:string;units:number};
export type Entry={lines?:RequestLine[];id:string;name:string;email:string;itemId:string;itemName:string;variantId:string;variantName:string;units:number;amount:number;pickup:string;note:string;status:string;created:string;emailSent:boolean};
export type Event={id:string;title:string;date:string;place:string;description:string;url:string;published:boolean};
export type State={items:Item[];events:Event[];requests:Entry[]};
export const initial:State={items:[
{id:"stickers",name:"Stickers with a little spirit",description:"A little joy for your water bottle, laptop, or wherever you collect your favorite things.",kind:"item",price:7,bundle:1,largePrice:0,largeBundle:0,published:true,image:"",variants:[],ends:""},
{id:"clips",name:"Good hair. Great miles.",description:"Colorful barrettes for race day, run club, and everything in between. Choose your shape, then your color.",kind:"item",price:8,bundle:6,largePrice:15,largeBundle:12,published:true,image:"",variants:[],ends:""},
{id:"sparkles",name:"A little finish-line sparkle",description:"Face sparkle temporary tattoos to bring a little extra shine to your run.",kind:"item",price:8,bundle:1,largePrice:0,largeBundle:0,published:true,image:"",variants:[],ends:""},
{id:"monstera",name:"A plant worth cheering for",description:"Bri’s monstera albo is looking for a new home. Bay Area locals only; the winner coordinates pickup with Bri.",kind:"raffle",price:10,bundle:1,largePrice:0,largeBundle:0,published:false,image:"",variants:[],ends:""},
{id:"bread",name:"Slow dough. Big heart.",description:"Homemade sourdough is on the horizon. Fresh loaves, baked with love.",kind:"soon",price:0,bundle:1,largePrice:0,largeBundle:0,published:true,image:"",variants:[],ends:""}
],events:[],requests:[]};
export const fundraiser="https://unrefugeesd-londonmarathon2027.funraise.org/fundraiser/brianna-solorzano";

export function listingPhotos(item:Item):ListingPhoto[]{return item.images?.length?item.images:item.image?[{id:"legacy-cover",url:item.image,alt:item.name}]:[];}
