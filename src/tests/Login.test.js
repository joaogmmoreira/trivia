import '@testing-library/jest-dom';
import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App'

const validEmail = 'test@mail.com';
const validName = 'Test Name'
const invalidEmail = 'test!mail';
const invalidName = ''

// https://github.com/testing-library/user-event/issues/424
// https://www.cluemediator.com/test-an-input-field-using-the-react-testing-library

describe('Testa se o componente Login:', () => {
  it('possui um formulário com input de email e senha', () => {
    renderWithRouterAndRedux(<App />);
    const buttonPlay = screen.getByTestId('btn-play');

    expect(buttonPlay).toBeInTheDocument();

    const emailInput = screen.getByTestId('input-gravatar-email')
    const nameInput = screen.getByTestId('input-player-name')

    expect(nameInput).toBeVisible();
    expect(emailInput).toBeVisible();

    userEvent.type(emailInput, validEmail);    
    expect(emailInput).toHaveValue(validEmail);

    userEvent.type(nameInput, validName);
    expect(nameInput).toHaveValue(validName);

  });
  it('redireciona para a URL /quiz ao clicar no botão Play', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const buttonPlay = screen.getByTestId('btn-play');

    const emailInput = screen.getByTestId('input-gravatar-email')
    const nameInput = screen.getByTestId('input-player-name')

    await userEvent.type(emailInput, validEmail);
    await userEvent.type(nameInput, validName);

    // screen.logTestingPlaygroundURL();
    userEvent.click(buttonPlay);

    const { pathname } = history.location;
    expect(pathname).toBe('/quiz');

  });
  it('desabilita o botão Play caso o e-mail ou a senha sejam inválidos', async () => {
    renderWithRouterAndRedux(<App />);
    const buttonPlay = screen.getByTestId('btn-play');

    expect(buttonPlay).toBeInTheDocument();

    const emailInput = screen.getByTestId('input-gravatar-email')
    const nameInput = screen.getByTestId('input-player-name')

    expect(nameInput).toBeVisible();
    expect(emailInput).toBeVisible();

    await userEvent.type(emailInput, invalidEmail);
    expect(emailInput).toHaveValue(invalidEmail);

    await userEvent.type(nameInput, invalidName);
    expect(nameInput).toHaveValue(invalidName);

    expect(buttonPlay).toBeDisabled();

  });
  it('possui um botão de configurações que ao clicar redireciona para a URL /Settings', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const buttonSettings = screen.getByTestId('btn-settings');

    userEvent.click(buttonSettings);

    const { pathname } = history.location;
    expect(pathname).toBe('/Settings');

  });
}); 