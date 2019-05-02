Rails.application.routes.draw do
  root 'green_spaces#index'
  devise_for :users

  resources :green_spaces, path: "greenspaces", only: [:index, :show, :new, :create]

  namespace :api do
    namespace :v1 do
      resources :green_spaces, path: "greenspaces", only: [:index, :show, :destroy] do
        resources :reviews, only: [:create]
      end
      resources :reviews, only: [:destroy]
      resources :users, only: [] do
        resources :reviews, only: [:show] do
          resources :votes, only: [:create]
        end
      end
      post '/greenspaces/search', to: 'green_spaces#search'
    end
  end
  resources :features, only: [:index, :show]
  resources :neighborhoods, only: [:index, :show]
end
