Rails.application.routes.draw do
  root 'green_spaces#index'
  devise_for :users

  resources :green_spaces, path: "greenspaces", only: [:index, :show, :new, :create]

  namespace :api do
    namespace :v1 do
      resources :green_spaces, only: [:show, :destroy]
    end
  end
end
