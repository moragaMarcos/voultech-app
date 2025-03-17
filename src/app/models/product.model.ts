// Detalles de los Productos
// - Nombre (texto, obligatorio)
// - Descripcion (texto, opcional)
// - Fecha (formato dd/mm/yyyy, obligatorio)
// - Estado (inicial, pendiente o completado) enum
// - Img (url:text,opcional)
// - Categoria de tipo (obligatoria, notebooks | celulares | consolas) enum
// - Precio de tipo number, obligatorio
export interface Product{
    id: number
    name: string
    description?: string
    creationDate: Date
    price: number
    urlImg?: string
    state: ProductState
    category: ProductCategory
}

export enum ProductState {
    Inicial = 'inicial',
    Pendiente = 'pendiente',
    Completado = 'completado',
}
  
export enum ProductCategory {
    Notebooks = 'Notebooks',
    Celulares = 'Celulares',
    Consolas = 'Consolas',
}