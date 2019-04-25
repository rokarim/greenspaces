class CreateCategorizations < ActiveRecord::Migration[5.2]
  def change
    create_table :categorizations do |t|
      t.belongs_to :green_space
      t.belongs_to :feature

      t.timestamps
    end
  end
end
