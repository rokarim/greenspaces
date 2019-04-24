Rails.application.routes.draw do
  root 'green_spaces#index'
  devise_for :users

  resources :green_spaces, only: [:index, :show, :new, :create]

  namespace :api do
    namespace :v1 do
      resources :green_spaces, only: [:show]
    end
  end
end
