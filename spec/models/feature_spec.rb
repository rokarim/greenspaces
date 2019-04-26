require 'rails_helper'

RSpec.describe Feature, type: :model do
  it { should have_valid(:name).when("Bark Park") }
  it { should_not have_valid(:name).when(nil,"") }
end
