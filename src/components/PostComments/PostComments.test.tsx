import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Post from '.';

describe('Teste para o componente PostComments', () => {
    it('Deve adicionar 2 comentários à lista', async () => {
        const { debug } = render(<Post />);
        console.log('=== Estado Inicial ===');
        debug();

        const commentForm = screen.getByTestId('comment-form');
        const commentInput = screen.getByTestId('comment-input');
        
        fireEvent.change(commentInput, { target: { value: 'Primeiro comentário' } });
        console.log('\n=== Após alterar primeiro comentário (antes do submit) ===');
        debug();
        
        fireEvent.submit(commentForm);
        console.log('\n=== Após submit do primeiro comentário ===');
        debug();

        fireEvent.change(commentInput, { target: { value: 'Segundo comentário' } });
        console.log('\n=== Após alterar segundo comentário (antes do submit) ===');
        debug();
        
        fireEvent.submit(commentForm);
        console.log('\n=== Após submit do segundo comentário ===');
        debug();

        await waitFor(() => {
            console.log('\n=== Verificando resultados finais ===');
            const comments = screen.getAllByTestId('comment');
            debug(); 
            
            console.log('Comentários encontrados:', comments.length);
            expect(comments).toHaveLength(2);
            expect(comments[0]).toHaveTextContent('Primeiro comentário');
            expect(comments[1]).toHaveTextContent('Segundo comentário');
        });

        console.log('\n=== Teste concluído ===');
    });
});