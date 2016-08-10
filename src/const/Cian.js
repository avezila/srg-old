
import {MEnum,VMap,Map,Float,String,Int,Bool} from "lib/TypeSystem"


export const ErrorType = MEnum("ErrorType",{
  BAD_TOKEN : "Ошибка авторизации",
  INTERNAL  : "Ошибка на стороне сервера",
  FETCH     : "Ошибка при выполнении запроса к серверу",
})

export const OfferType = MEnum("OfferType",{
  FLAT        : "Квартира",
  COMMERCIAL  : "Коммерческая недвижимость",
})


export const RealtyType = MEnum("RealtyType",{
  BUILT_IN_OFFICE     : "Встроенное офисное помещение",
  BUILT_IN_COMMERCIAL : "Встроенные торговые помещения",
  BUILT_IN_STORAGE    : "Встроенные производственно-складские помещения",
  FREE_SPACE          : "Помещения свободного назначения",
  DETACHED            : "Отдельно стоящие здания",
  GAS_STATION         : "АЗС",
  TANK_FARM           : "Нефтебаза",
  HOTEL               : "Гостиница",
  PARKING             : "Автостоянка",
  RECREATION_CENTER   : "База отдыха",
  PROPERTY_COMPLEX    : "Имущественный комплекс",
  LAND_PLOT           : "Земельный участок",
  RESELLERS           : "Вторичное жилье",
  NEW                 : "Новостройка",
})

export const EntryType = MEnum("EntryType",{
  BY_PASS     : "по пропуску",
  SEPARATE    : "отдельный вход",
  FREE        : "свободный вход",
})

export const BuildingType = MEnum("BuildingType",{
  RESIDENTIAL     : "жилое",
  NON_RESIDENTIAL : "нежилое",
})
export const BuildingClass = MEnum("BuildingClass",{
  A     : "A",
  APLUS : "A+",
  B     : "B",
  BPLUS : "B+",
  C     : "C",
  CPLUS : "C+",
  D     : "D",
  DPLUS : "D+",
})
export const ContractType = MEnum("ContractType",{
  SALE            : "продажа",
  PERMISSION      : "переуступка прав",
  DIRECT_RENT     : "прямая аренда",
  SUB_RENT        : "субаренда",
})
export const WallsType = MEnum("WallsType",{
  PANEL               : "панельный",
  KIRPICH             : "кирпичный",
  WOODEN              : "деревянный",
  MONOLITH            : "монолитный",
  BLOCK               : "блочный",
  MONOLITH_KIRPICH    : "монолитно-кирпичный", 
})

export const FigureType = MEnum("FigureType",{
  BOX     : "BOX",
  CIRCLE  : "CIRCLE",
})
export const Error = Map("Error",{
  type  : ErrorType,
  msg   : String,
  e     : undefined,
})

export const Figure = Map("Figure",{
  type    : FigureType,
})

export const Circle = Map("Circle",{
  ...Figure.const({type:"CIRCLE"}),
  center : Float.array(2),
  radius : Float,
})

export const Box = Map("Box",{
  ...Figure.const({type:"BOX"}),
  box : Float.array(2,2),
})

export const Offer = VMap("Offer",{
  id          : String,
  type        : OfferType,
  realtyType  : RealtyType,
  url         : String,
  photoUrls   : String.array(),
  rawAddress  : String,
  location    : Float.array(2),
  date        : String,
  sourceName  : String,
  sourceText  : String,
  price       : Int,
})

export const OfferCommercial = Map("OfferCommercial",{
  ...Offer.const({type:"COMMERCIAL"}),
  entryType     : EntryType,
  buildingType  : BuildingType,
  buildingClass : BuildingClass,
  furniture     : Bool,
  contractType  : ContractType,
  line          : Int,
  storeys       : Int.array(),
})

export const OfferFlat = Map("OfferFlat",{
  ...Offer.const({type:"FLAT"}),
  storeys       : Int.array(),
  wallsType     : WallsType,
  living        : Float,
  kitchen       : Float,
})


export const ComparableOffer = VMap("ComparableOffer",{
  ...Offer,
})

export const ComparableOfferCommercial = Map("ComparableOfferCommercial",{
  ...OfferCommercial,
})

export const ComparableOfferFlat = Map("ComparableOfferFlat",{
  ...OfferFlat,
})


export const Context = Map("Context",{
  id          : String,
  favoriteIDs : String.array(),
  enviroment  : {},
  reportLink  : String,
  modified    : String,
  created     : String,
  comparable  : ComparableOffer,
})

export const Filter = VMap("Filter",{
  type        : OfferType.array(),
  realtyType  : RealtyType.array(),
  price       : {
    from  : Float,
    to    : Float,
  },
  photoRequired : Bool,
  date    : {
    from  : String,
    to    : String,
  },
  location  : Figure.array(),
  sources   : String.array(),
  space     : {
    from  : Float,
    to    : Float,
  },
}).default({
  type : [],
  realtyType : [],
  price : {},
  photoRequired : false,
  date : {},
  location : [],
  sources  : [],
  space    : {},
})


export const FilterCommercial  = Map("FilterCommercial",{
  ...Filter.default({type:["COMMERCIAL"]}),
  entryType   : EntryType.array(),
  floor       : {
    from  : Int,
    to    : Int, 
  },
  floorHint : {
    notFirst : Bool,
    notLast  : Bool,
  },
  storeys   : {
    from    : Int,
    to      : Int,
  },
  buildingType  : BuildingType.array(),
  buildingClass : BuildingClass.array(),
  furniture     : Bool,
  rooms         : {
    from  : Int,
    to    : Int,
  },
  contractType  : ContractType.array(),
  line          : Int.array(),
  include       : String.array(),
  exclude       : String.array(),
}).default({
  furniture : true
})
export const FilterFlat  = Map("FilterFlat",{
  ...Filter.default({type:["FLAT"]}),
  floor       : {
    from  : Int,
    to    : Int, 
  },
  floorHint : {
    notFirst : Bool,
    notLast  : Bool,
  },
  storeys   : {
    from    : Int,
    to      : Int,
  },
  wallsType : WallsType.array(),
  rooms     : Int.array(),
  living : {
    from : Float,
    to   : Float,
  },
  kitchen : {
    from  : Float,
    to    : Float,
  },
  pricePerMeter : {
    from  : Int,
    to    : Int,
  }
})

export const Token = Map("Token",{
  id  : String,
})


export const Rpc = Map("CianRpc",{
  getContext : {
    request : {
      token : String,
    },
    response : {
      context : Context,
      error   : Error,
    },
  },
  getOffers : {
    request : {
      token : String,
      offerIDs : String.array(),
    },
    response : {
      offers  : Offer.array(),
      error   : Error,
    },
  },
  filterOffers : {
    request : {
      token   : String,
      filter  : Filter,
    },
    response : {
      offerIDs  : String.array(),
      error     : Error,
    },
  },
  updateContext : {
    request : {
      token   : String,
      context : Context,
    },
    response : {
      error   : Error,
    },
  },
  addOfferToReport : {
    request : {
      token   : String,
      offerID : String,
    },
    response : {
      error   : Error,
    },
  },
  ymaps : {
    request : {
      token : String,
      query : String,
    },
    response : {
      result  : String,
      error   : Error,
    },
  },
})