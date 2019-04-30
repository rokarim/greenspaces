class AddCoordinates < ActiveRecord::Migration[5.2]
  def change
    add_column :green_spaces, :coordinates, :text, null: false
    add_column :green_spaces, :address, :string
    add_column :green_spaces, :acres, :real
  end
end
