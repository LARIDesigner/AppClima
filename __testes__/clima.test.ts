import { buscarClima } from '../src/servicos/apiClima';
import { describe, test, expect } from '@jest/globals';

// Teste: verifica se a temperatura retornada é um número válido
test('temperatura deve ser um valor numérico', async () => {
  const dados = await buscarClima('São Paulo', 'BR');

  // Verifica se é um número
  expect(typeof dados.temperatura).toBe('number');

  // Verifica se não é NaN (not a number)
  expect(isNaN(dados.temperatura)).toBe(false);

  // Verifica se está em uma faixa razoável de temperatura
  expect(dados.temperatura).toBeGreaterThan(-50);
  expect(dados.temperatura).toBeLessThan(60);
});
