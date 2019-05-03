class AddGreenSpaceIndex < ActiveRecord::Migration[5.2]
  def change
    add_index :green_spaces, :name,           unique: true
  end
end
