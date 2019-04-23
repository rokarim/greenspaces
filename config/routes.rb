Rails.application.routes.draw do
<<<<<<< HEAD
  root 'homes#index'
  
=======
  root 'green_spaces#index'
>>>>>>> 49e8fff831e1600f3a29b74f09de3fe5add164e0
  devise_for :users

  resources :green_spaces, only: [:index, :show]
end
