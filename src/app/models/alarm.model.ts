import { ProductCategory, ProductState } from "./product.model"

export interface Alarm{
    id: number
    name: string
    category: ProductCategory
    criterion: ProductState
    condition: AlarmCondition
    value: number
    isEditing:boolean
    active: false
}

export enum AlarmCondition{
    MayorQue = 'mayor que',
    MenorQue = 'menor que',
    MayorOIgualQue = 'mayor o igual que',
    MenorOIgualQue = 'menor o igual que'
}