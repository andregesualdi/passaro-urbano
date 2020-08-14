import { PipeTransform, Pipe } from '@angular/core'

@Pipe({
    name: 'descricaoReduzida'
})
export class DescricaoReduzida implements PipeTransform {
    transform(termo: string, truncarEm: number): string {
        if (termo.length > 15 ) {
            return termo.substr(0, truncarEm).concat('...');
        }

        return termo;
    }
}
