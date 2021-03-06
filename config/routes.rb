Rails.application.routes.draw do
  devise_for :users
  root 'groups#index'
  resources :users, only: [:index, :edit, :update, :create] do
    collection do
      get 'search' 
    end
  end
  resources :groups, only: [:index, :new, :create, :edit, :update] do
    resources :messages, only: [:index, :create]
    namespace :api do
      resources :messages, only: [:index, :create], defaults: { format: 'json' }
    end
  end
end


