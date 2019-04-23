require 'rails_helper'

RSpec.describe GreenSpace, type: :model do
  it { should have_valid(:name).when("Bark Park") }
  it { should_not have_valid(:name).when(nil,"") }

  it { should have_valid(:description).when("Lots of open space.", nil, "") }
end
