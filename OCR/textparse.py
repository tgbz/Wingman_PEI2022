import re
from difflib import get_close_matches
import dateutil.parser
import json
import os



dateRE = r'(\d{2}\/\d{2}\/\d{4})'

pdItemRE = r'(\S+) ([a-zA-Z].+)\s( |)((\d|\d{2}),(\d{2}|\d{3}))\s'

totalRE = r'\d+(\.\s?|,\s?|[^a-zA-Z\d])\d{2}'

valueRE = r'(\d+[,| |.]+\d+)'


class Receipt():
	def __init__(self,raw,info_json):
		self.raw = raw
		self.lines = self.normalize(raw)
		self.market = None
		self.items = {}
		self.date = None
		self.total = None
		try:
			self.info = json.load(open(info_json))
		except:
			print(f"Error importing '{info_json}'!")
			exit(0)
		self.parse()

	def normalize(self,raw):
			return os.linesep.join([s for s in raw.splitlines() if s.strip()]).lower().splitlines()


	def parse(self):
		self.market = self.parse_market()
		self.items = self.parse_items()
		self.date = self.parse_date()
		if self.market == 'Pingo Doce':
			self.total = self.parse_total_pingo_doce()

		print(self.to_json())
	

	def close_match(self,keyword,accuracy=0.6):
		for line in self.lines:
			words = line.split()
			matches = get_close_matches(keyword, words, 1, accuracy)
			if matches:
				print('\n\nMATCHED',matches,'\n',line)
				return line

	
	def parse_market(self):
		for int_accuracy in range(10, 4, -1):
			accuracy = int_accuracy / 10.0
			min_accuracy, market_match = -1, None
			for market in self.info['Markets']:
				for spelling in self.info['Markets'][market]:
					line = self.close_match(spelling, accuracy)
					#print(spelling,'\n',line)
					if line and (accuracy < min_accuracy or min_accuracy == -1):
						min_accuracy = accuracy
						market_match = market

						return market_match
		return market_match


	def parse_items(self):
		jump = False
		for i,line in enumerate(self.lines):
			if jump: 
				jump = False
				continue

			match = re.search(pdItemRE,line)
			if match:
				itemName = match.group(4)
				if get_close_matches('poupanca', self.lines[i+1].split(), 1, 0.6):
					ivalue = float(match.group(4).replace(',','.'))
					matchP = re.search(valueRE,self.lines[i+1])
					if matchP:
						pvalue = float(matchP.group(0).replace(',','.'))
						value = ivalue-pvalue
						jump = True
				else:
					value = float(match.group(0).replace(',','.'))
				self.items[itemName] = value


	def parse_date(self):
		for line in self.lines:
			match = re.search(dateRE, line)
			if match:
				date_str = match.group(1)
				date_str = date_str.replace(" ", "")
				try:
					dateutil.parser.parse(date_str)
				except ValueError:
					return None
				return date_str

	

	def parse_total_pingo_doce(self):
		for total_key in self.info['Totals']:
			for int_accuracy in range(10, 4, -1):
				accuracy = int_accuracy / 10.0
				total_line = self.close_match(total_key,accuracy)
				if total_line:
					print('Found possible total line')
					matches2 = get_close_matches('pagar', total_line.split(), 1, 0.6)
					if matches2:
						print('Found pagar total line')
						match = re.search(totalRE,total_line)
						if match:
							total = match.group(0).replace(',','.')
							return float(total)

	def to_json(self):
		object_data = {
			"market": self.market,
			"items": self.items,
			"date": self.date,
			"total": self.total,
		}

		return json.dumps(object_data)




raw = open('_NoPreprocessing.txt').read()



Receipt(raw,'info.json')