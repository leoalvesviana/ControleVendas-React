export interface MovimentacaoFinanceiraPage  {

    movimentacaoFinanceira: MovimentacaoFinanceira[];
    numeroCompras: number;
    quantidadeItens: number;
    totalGeral: number;
}

export interface MovimentacaoFinanceira {

    cliente: Cliente;
    compra: Compra;
}

export interface Status{
    codigo: number;
    tipo: string;
}

export interface Cliente {
    codigo: number;
    nome: string;
    tratamento: string;
    data: Date;
    telefone1?: string;
    telefone2?: string;
    email1?: string;
    email2?: string;
    observacoes?: string;
    foto: string;
    status: string;

}

export interface Compra{
    numCompra: number;
    status: string;
    dataCompra: Date;
    totalItens: number;
    valor: number;
}

export interface produto{
    codigo: number;
    descricao: string;
    valor: number;
}

export interface Pedido{
    cliente: Cliente;
    produtos: produto[];
    numCompra: number;
    totalItens: number;
    status: number;
    totalCompra: number;
    codItem: number;
    quantidadeNovoItem: number;
}

export interface Usuario{
    codigo: number;
    nome: string;
    login: string;
    email: string;
    senha: string;
    admin: boolean;
}