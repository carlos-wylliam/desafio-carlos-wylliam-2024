class RecintosZoo {
    constructor() {
        this.recintos = [
            { numero: 1, bioma: 'savana', tamanho: 10, animais: ['macaco'], quantidadeAnimais: [3] },
            { numero: 2, bioma: 'floresta', tamanho: 5, animais: [], quantidadeAnimais: [] },
            { numero: 3, bioma: ['savana', 'rio'], tamanho: 7, animais: ['gazela'], quantidadeAnimais: [1] },
            { numero: 4, bioma: 'rio', tamanho: 8, animais: [], quantidadeAnimais: [] },
            { numero: 5, bioma: 'savana', tamanho: 9, animais: ['leao'], quantidadeAnimais: [1] }
        ];

        this.animais = {
            LEAO: { tamanho: 3, bioma: 'savana' },
            LEOPARDO: { tamanho: 2, bioma: 'savana' },
            CROCODILO: { tamanho: 3, bioma: 'rio' },
            MACACO: { tamanho: 1, bioma: ['savana', 'floresta'] },
            GAZELA: { tamanho: 2, bioma: 'savana' },
            HIPOPOTAMO: { tamanho: 4, bioma: ['savana', 'rio'] }
        };
    }

    analisaRecintos(animal, quantidade) {
        if (!this.animais[animal.toUpperCase()]) {
            return { erro: 'Animal inválido' };
        }

        if (quantidade <= 0 || isNaN(quantidade)) {
            return { erro: 'Quantidade inválida' };
        }

        const animalInfo = this.animais[animal.toUpperCase()];
        const recintosViaveis = [];

        this.recintos.forEach(recinto => {
            const biomaAdequado = Array.isArray(recinto.bioma)
                ? recinto.bioma.includes(animalInfo.bioma)
                : recinto.bioma === animalInfo.bioma;
        
            if (!biomaAdequado) {
                return;
            }
        
            const animaisExistentes = recinto.animais;
            const quantidadeExistente = recinto.quantidadeAnimais;
        
            const tamanhoEspacoOcupado = animaisExistentes.reduce((total, esp, idx) => {
                const animal = this.animais[esp.toUpperCase()];
                const quantidade = quantidadeExistente[idx];
                return animal ? total + (animal.tamanho * quantidade) : total;
            }, 0);
        
            const espacoNecessario = (quantidade * animalInfo.tamanho);
        
            let espacoExtra = 0;
            if (animal.toUpperCase() === 'GAZELA' && animaisExistentes.includes('MACACO')) {
                espacoExtra = 1;
            } else if (animal.toUpperCase() === 'MACACO' && animaisExistentes.includes('GAZELA')) {
                espacoExtra = 1;
            }
        
            const espacoNecessarioTotal = espacoNecessario + espacoExtra;
        
            if (espacoNecessarioTotal <= recinto.tamanho - tamanhoEspacoOcupado) {
                if (animal.toUpperCase() === 'MACACO' && !animaisExistentes.length) {
                    return;
                }
        
                const espacoLivre = recinto.tamanho - (tamanhoEspacoOcupado + espacoNecessarioTotal);
                recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanho})`);
                console.log(`Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanho})`);
            }
        });
        

        if (recintosViaveis.length === 0) {
            return { erro: 'Não há recinto viável' };
        }

        return { recintosViaveis };
    }
}

new RecintosZoo().analisaRecintos("GAZELA", 2)
export { RecintosZoo as RecintosZoo };
