Rails.application.routes.draw do
  root 'green_spaces#index'
  devise_for :users

  resources :green_spaces, path: "greenspaces", only: [:index, :show, :new, :create]
end
