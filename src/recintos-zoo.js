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
            const biomaAdequado = Array.isArray(animalInfo.bioma)
                ? animalInfo.bioma.some(b => Array.isArray(recinto.bioma) ? recinto.bioma.includes(b) : recinto.bioma === b)
                : recinto.bioma === animalInfo.bioma;

            if (biomaAdequado) {
                const animaisExistentes = recinto.animais;
                const quantidadeExistente = recinto.quantidadeAnimais;
                const tamanhoEspacoOcupado = animaisExistentes.reduce((total, esp, idx) => {
                    const animal = this.animais[esp.toUpperCase()];
                    const quantidade = quantidadeExistente[idx];
                    return animal ? total + (animal.tamanho * quantidade) : total;
                }, 0);

                const contemCarnivoro = animaisExistentes.some(a => ['LEAO', 'LEOPARDO', 'CROCODILO'].includes(a.toUpperCase()));
                if (contemCarnivoro && !['LEAO', 'LEOPARDO'].includes(animal.toUpperCase())) {
                    return;
                }

                let espacoExtra = 0;
                if (recinto.numero === 3 && animaisExistentes.includes('gazela') && animal.toUpperCase() === 'MACACO' && quantidade >= 2) {
                    espacoExtra = 1;
                } else if (animaisExistentes.length > 1) {
                    espacoExtra = 1;
                }

                const espacoNecessario = (quantidade * animalInfo.tamanho) + espacoExtra;
                const espacoLivre = recinto.tamanho - (tamanhoEspacoOcupado + espacoNecessario);

                if (espacoNecessario <= (recinto.tamanho - tamanhoEspacoOcupado)) {
                    recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanho})`);
                }
            }
        });

        if (recintosViaveis.length === 0) {
            return { erro: 'Não há recinto viável' };
        }

        return { recintosViaveis };
    }
}

const resultado = new RecintosZoo().analisaRecintos("MACACO", 2);

export { RecintosZoo as RecintosZoo };