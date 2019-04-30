Rails.application.routes.draw do
  root 'green_spaces#index'
  devise_for :users

  resources :green_spaces, path: "greenspaces", only: [:index, :show, :new, :create]

  namespace :api do
    namespace :v1 do
      resources :green_spaces, path: "greenspaces", only: [:show, :destroy] do
        resources :reviews, only: [:create]
      end
      resources :reviews, only: [:destroy]
    end
  end
  resources :features, only: [:index, :show]
  resources :neighborhoods, only: [:index, :show]
end
