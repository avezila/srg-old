
import {Enum,Type,Float,String,Int,Bool} from "lib/TypeSystem"


export const ErrorType = Enum("ErrorType",{
  BAD_TOKEN : "ошибка авторизации",
  INTERNAL  : "ошибка на стороне сервера",
})

export const OfferType = Enum("OfferType",{
  FLAT        : "Квартира",
  COMMERCIAL  : "Коммерческая недвижимость",
})


export const RealtyType = Enum("RealtyType",{
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

export const EntryType = Enum("EntryType",{
  BY_PASS     : "по пропуску",
  SEPARATE    : "отдельный вход",
  FREE        : "свободный вход",
})

export const BuildingType = Enum("BuildingType",{
  RESIDENTIAL     : "жилое",
  NON_RESIDENTIAL : "нежилое",
})
export const BuildingClass = Enum("BuildingClass",{
  A     : "A",
  APLUS : "A+",
  B     : "B",
  BPLUS : "B+",
  C     : "C",
  CPLUS : "C+",
  D     : "D",
  DPLUS : "D+",
})
export const ContractType = Enum("ContractType",{
  SALE            : "продажа",
  PERMISSION      : "переуступка прав",
  DIRECT_RENT     : "прямая аренда",
  SUB_RENT        : "субаренда",
})
export const WallsType = Enum("WallsType",{
  PANEL               : "панельный",
  KIRPICH             : "кирпичный",
  WOODEN              : "деревянный",
  MONOLITH            : "монолитный",
  BLOCK               : "блочный",
  MONOLITH_KIRPICH    : "монолитно-кирпичный", 
})

export const FigureType = Enum("FigureType",{
  BOX     : "BOX",
  CIRCLE  : "CIRCLE",
})

export const Figure = Type("Figure",{
  type    : FigureType,
})

export const Circle = Type("Circle",{
  ...Figure.const({type:"CIRCLE"}),
  center : Float.array(2),
  radius : Float,
})

export const Box = Type("Box",{
  ...Figure.const({type:"BOX"}),
  box : Float.array(2,2),
})

export const Offer = Type("Offer",{
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

export const OfferCommercial = Type("OfferCommercial",{
  ...Offer.const({type:"COMMERCIAL"}),
  entryType     : EntryType,
  buildingType  : BuildingType,
  buildingClass : BuildingClass,
  furniture     : Bool,
  contractType  : ContractType,
  line          : Int,
  numberOfStoreysInBuilding : Int.array(),
},)

export const OfferFlat = Type("OfferFlat",{
  ...Offer.const({type:"FLAT"}),
  numberOfStoreysInBuilding : Int.array(),
  wallsType                 : WallsType,
  living                    : Float,
  kitchen                   : Float,
})


export const ComparableOffer = Type("ComparableOffer",{
  ...Offer,
})

export const ComparableOfferCommercial = Type("ComparableOfferCommercial",{
  ...OfferCommercial,
})

export const ComparableOfferFlat = Type("ComparableOfferFlat",{
  ...OfferFlat,
})


export const Context = Type("Context",{
  id          : String,
  favoriteIDs : String.array(),
  enviroment  : {},
  reportLink  : String,
  modified    : String,
  created     : String,
  comparable  : ComparableOffer,
})

export const Filter = Type("Filter",{
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
  }
})

export const FilterCommercial  = Type("FilterCommercial",{
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
})
export const FilterFlat  = Type("FilterFlat",{
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
  livingSpace : {
    from : Float,
    to   : Float,
  },
  kitchenSpace : {
    from  : Float,
    to    : Float,
  },
  pricePerMeter : {
    from  : Int,
    to    : Int,
  }
})

export const Token = Type("Token",{
  id  : String,
})

