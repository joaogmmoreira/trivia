import '@testing-library/jest-dom';
import React from 'react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import { screen } from '@testing-library/react';

describe('Testes acerca da página de Feedback', () => {

  const MOCK_PLAYER_1 = {
    player: {
      name: 'Example',
      assertions: 5,
      score: 110,
      gravatarEmail: 'example@example.com'
    }
  }

  const MOCK_PLAYER_2 = {
    player: {
      name: 'Example',
      assertions: 2,
      score: 16,
      gravatarEmail: 'example@example.com'
    }
  }

  test('Verifica se ao ter acertado mais do que 3 questões, a mensagem \'Well Done!\' aparece na tela', () => {
    renderWithRouterAndRedux(<App />, MOCK_PLAYER_1, '/feedback');
    const feedbackText = screen.getByTestId('feedback-text');
    expect(feedbackText).toHaveTextContent("Well Done!");
  });

  test('Verifica se ao ter acertado menos que 3 questões, a mensagem \'Could be better...\' aparece na tela', () => {
    renderWithRouterAndRedux(<App />, MOCK_PLAYER_2, '/feedback');
    const feedbackText = screen.getByTestId('feedback-text');
    expect(feedbackText).toHaveTextContent("Could be better...");
  });

});


