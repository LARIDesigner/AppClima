import { useState, useEffect, useRef } from 'react';

// O debounce evita disparar uma requisição a cada tecla digitada.
// Só busca depois que o usuário parar de digitar por 600ms.
export function useBusca(aoFinalizar: (texto: string) => void, espera = 600) {
  const [textoBusca, setTextoBusca] = useState('');
  const temporizador = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Cancela o temporizador anterior se o usuário ainda está digitando
    if (temporizador.current) clearTimeout(temporizador.current);

    // Só dispara a busca se tiver pelo menos 2 caracteres
    if (textoBusca.trim().length < 2) return;

    // Aguarda o tempo de espera antes de buscar
    temporizador.current = setTimeout(() => {
      aoFinalizar(textoBusca.trim());
    }, espera);

    // Limpa o temporizador quando o componente é desmontado
    return () => {
      if (temporizador.current) clearTimeout(temporizador.current);
    };
  }, [textoBusca]);

  return { textoBusca, setTextoBusca };
}