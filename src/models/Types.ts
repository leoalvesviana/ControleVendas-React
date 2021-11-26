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