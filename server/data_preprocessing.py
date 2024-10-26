import csv
import pandas as pd

def read_in_csv_file(file_path):
    with open(file_path, mode='r', newline='', encoding='utf-8') as file:
        reader = csv.reader(file)
        data = list(reader)
        file.close()

    return data

def calc_data_stats(hurricane_data, outcome_data):
    num_unique_storms = 0
    num_rows = len(hurricane_data)
    for i in range(len(hurricane_data[:-1])):
        if hurricane_data[i][1] != hurricane_data[i + 1][
            1]: num_unique_storms += 1

    num_with_outcome_data = 0
    for row in hurricane_data[1:]:
        name = row[1]
        year = row[2]

        for outcome_row in outcome_data:
            inner_name = outcome_row[0]
            inner_year = outcome_row[1]
            # Skip if the first row that only has headers
            if inner_year == "Duration": continue

            # 9 is the cutoff length
            if len(inner_year) <= 9:
                inner_year = inner_year[-2:]
                if int(inner_year) > 24:
                    inner_year = "19" + inner_year
                else:
                    inner_year = "20" + inner_year
            else:
                inner_year = inner_year[-4:]

            if name == inner_name and year == inner_year:
                row += [outcome_row[5], outcome_row[6]]
                num_with_outcome_data += 1

    return num_rows, num_unique_storms, num_with_outcome_data

def display_report(num_rows, num_unique_storms, num_with_outcome_data):
    print("-------------- Report --------------")
    print(f"Entries with outcome data added:"
          f" {str(100*num_with_outcome_data/num_rows)}%")
    print(f"Number of rows in data set: {num_rows}")
    print(f"Number of unique storms: {num_unique_storms}")
    print(f"Average rows per unique storm: {num_rows/num_unique_storms}")
    print(f"Average storm duration: {(num_rows/num_unique_storms)/4} days")
    print("------------------------------------")

def main():
    hurricane_data = read_in_csv_file('data\\storms.csv')
    outcome_data = read_in_csv_file('data\\hurricane_info.csv')

    num_rows, num_unique_storms, num_with_outcome_data = calc_data_stats(
        hurricane_data, outcome_data)

    df = pd.DataFrame(hurricane_data[1:], columns=(hurricane_data[0] + ["Deaths",
                                                                    "Damages"]))
    pd.set_option('display.max_rows', None)
    pd.set_option('display.max_columns', None)
    pd.set_option('display.expand_frame_repr', False)
    print(df.head(100))

    # The goal is to get the remaining rows for Damages and Death to be
    # filled in. Afterward, we need to preprocess the data more by getting all
    # cells to an appropriate numerical form for the deep learning model. We can
    # use Pytorch or TensorFlow to create the DL model.
    display_report(num_rows, num_unique_storms, num_with_outcome_data)

main()