import { ItemCarrinho } from '../shared/models/item-carrinho.model';
import { Oferta } from '../shared/models/oferta.model';

class CarrinhoService {
    public itens: ItemCarrinho[] = [];

    public exibirItens(): ItemCarrinho[] { 
        return this.itens;
    }

    public incluirItem(oferta: Oferta): void {
        let itemCarrinho: ItemCarrinho = new ItemCarrinho(
            oferta.id,
            oferta.imagens[0],
            oferta.titulo,
            oferta.descricao_oferta,
            oferta.valor,
            1
        );
        
        let itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id);

        if (itemCarrinhoEncontrado) {
            itemCarrinhoEncontrado.quantidade++;
        } else {
            this.itens.push(itemCarrinho);
        }
    }

    public totalCarrinhoCompras(): number {
        let total: number = 0;
        this.itens.map((item: ItemCarrinho) => {
            total += (item.valor * item.quantidade);
        });
        return total;
    }

    public adicionarQuantidade(itemCarrinho: ItemCarrinho): void {
        let itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id);

        if (itemCarrinhoEncontrado) {
            itemCarrinhoEncontrado.quantidade++;
        }
    }

    public removerQuantidade(itemCarrinho: ItemCarrinho): void {
        let itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id);

        if (itemCarrinhoEncontrado) {
            itemCarrinhoEncontrado.quantidade--;

            if (itemCarrinhoEncontrado.quantidade === 0) {
                this.itens.splice(this.itens.indexOf(itemCarrinhoEncontrado), 1);
            }
        }
    }

    public limparCarrinho(): void {
        this.itens = [];
    }
}

export { CarrinhoService };