import re
from difflib import get_close_matches
from difflib import SequenceMatcher
import dateutil.parser
import json
import os
import preProcessing as pp



date1RE = r'(\d{4})[\/|\-](\d{2})[\/|\-](\d{2})'

date2RE = r'(\d{2})[\/|\-](\d{2})[\/|\-](\d{4})'

pdItemRE = r'(\S+) ([a-zA-Z].+)\s( |)((\d|\d{2}),[ ]{0,1}(\d{2}|\d{3}))$'

lidlItemRE = r'^([^\d][^\n]+) ((\d|\d{2})[^\d]{0,2}(\d{2}|\d{3}))[ a-zA-Z]*$'

totalRE = r'\d+(\.\s?|,\s?|[^a-zA-Z\d])\d{2}'

valueRE = r'(\d+[,| |.]+\d+)'

debug,output = False,False

class Receipt():
	def __init__(self,raw,info_json):
		self.raw = raw
		self.lines = self.normalize(raw)
		self.market = None
		self.items = {}
		self.date = None
		self.total = 0
		try:
			self.info = json.load(open(info_json))
		except:
			print(f"Error importing '{info_json}'!")
			exit(0)

	def normalize(self,raw):
			return os.linesep.join([s for s in raw.splitlines() if s.strip()]).lower().splitlines()

	def parse(self):
		self.market = self.parse_market()
		if self.market == 'Pingo Doce':
			self.parse_items_pd()
		elif self.market == 'Lidl':
			self.parse_items_lidl()

		self.date = self.parse_date()
		self.total = 0
		for item in self.items.keys():
			self.total += self.items[item]

		return self.to_json()
	
	def close_match(self,keyword,accuracy=0.6):
		for line in self.lines:
			words = line.split()
			matches = get_close_matches(keyword, words, 1, accuracy)
			if matches:
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

	def parse_items_lidl(self):
		for i,line in enumerate(self.lines):
			match = re.search(lidlItemRE,line)
			#match2 = get_close_matches('total', line.split(), 1, 0.6)
			match3 = get_close_matches('multibanco', line.split(), 1, 0.6)
			match4 = get_close_matches('contribuinte', line.split(), 1, 0.6)
			if match3:
				break
			if match:
				itemName = match.group(1)
				valueDecimal = float(match.group(4))*0.01
				value = float(match.group(3))+valueDecimal
				self.items[itemName] = round(value,2)

	def parse_items_continente(self):
		for i,line in enumerate(self.lines):
			match = re.search(lidlItemRE,line)
			#match2 = get_close_matches('total', line.split(), 1, 0.6)
			match3 = get_close_matches('multibanco', line.split(), 1, 0.6)
			match4 = get_close_matches('contribuinte', line.split(), 1, 0.6)
			if match3:
				break
			if match:
				itemName = match.group(1)
				valueDecimal = float(match.group(4))*0.01
				value = float(match.group(3))+valueDecimal
				self.items[itemName] = round(value,2)
			
	def parse_items_pd(self):
		jump = False
		for i,line in enumerate(self.lines):
			if get_close_matches('resumo', line.split(), 1, 0.6):
				break
			if jump:
				jump = False
				continue
			match = re.search(pdItemRE,line)
			if match:
				value = 0
				itemName = match.group(2)
				if get_close_matches('poupanca', self.lines[i+1].split(), 1, 0.6):
					ivalue = float(match.group(4).replace(',','.').replace(' ',''))
					matchP = re.search(valueRE,self.lines[i+1])
					if matchP:
						pvalue = float(matchP.group(0).replace(',','.').replace(' ',''))
						value = ivalue-pvalue
						jump = True
				else:
					value = float(match.group(4).replace(',','.').replace(' ',''))
				self.items[itemName] = round(value,2)

	def parse_date(self):
		date_str = None
		for line in self.lines:
			match1 = re.search(date1RE, line)
			match2 = re.search(date2RE, line)
			if match1:
				date_str = match1.group(3) +'-'+ match1.group(2) +'-'+ match1.group(1)
			if match2:
				date_str = match2.group(1) +'-'+ match2.group(2) +'-'+ match2.group(3)
			if match1 or match2:
				try:
					dateutil.parser.parse(date_str)
					break
				except ValueError:
					continue
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


def concat(r1,r2):
	l1 = r1.lines
	l2 = r2.lines

	newlines = []

	for line1 in l1:
		for line2 in l2:
			ratio = SequenceMatcher(None,line1,line2).ratio()
			if ratio < 0.7:
				newlines.append(line2)

	nl = l1 + newlines
	r1.lines = nl

	return r1.parse()
	
				
		






def parseImage(files):
	filename = files[0] #fix temporario enquanto nao se implementa o parsing de + que 1 imagem
	image = pp.cv2.imread(filename)
	if debug: pp.show(image,'Original')

	preProc = [pp.normalize,pp.remove_noise,pp.remove_shadows]

	raw = pp.generate_text('out',pp.pipeline(image,preProc),output)
	r = Receipt(raw,'info.json')
	
	return r.parse()

	#else 
	r3 = concat(r1,r2)




if __name__ == '__main__':
	filename,debug,output = pp.parse()


