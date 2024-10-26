import pandas as pd

# Filter and load the location names and its population densities
pop_density = pd.read_csv("../datasets/WPP2024_Demographic_Indicators.csv")
pop_density = pd.read_csv("../datasets/WPP2024_Demographic_Indicators.csv", usecols=["Location", "PopDensity"])

# Print the filtered data for testing purposes
print(pop_density)
