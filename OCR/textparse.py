import re
from difflib import get_close_matches
from difflib import SequenceMatcher
import dateutil.parser
import json
import os
import preProcessing as pp
from datetime import datetime



date1RE = r'(\d{4})[\/|\-](\d{2})[\/|\-](\d{2})'

date2RE = r'(\d{2})[\/|\-](\d{2})[\/|\-](\d{4})'

pdItemRE = r'(\S+) ([a-zA-Z].+)\s( |)((\d|\d{2})[,. ]{1,2}(\d{2}|\d{3}))$'

noPricePDItemRE = r'(\S+) ([a-zA-Z \d]{4,})$'

pdTotalRE = r'([a-zA-Z].+)\s( |)((\d|\d{2})[,. ]{1,2}(\d{2}|\d{3}))$'

lidlItemRE = r'^([^\d][^\n]+) ((\d|\d{2})[^\d]{0,2}(\d{2}|\d{3}))[ a-zA-Z]*$'

totalRE = r'([^0-9])+[ ]{0,1}(\d{1,2}[., ]{1,2}\d{2}|\d{3})'

valueRE = r'(\d+[,| |.]+\d+)'

qtdRE = r'(\d{1,2}[., ]{0,2}\d{0,3}) {0,2}[xX] {0,2}(\d{1,2}[,. ]{1,2}\d{2,3}) {1,2}(\d{1,2}[,. ]{1,2}\d{2})'



debug,output = False,False

class Receipt():
	def __init__(self,raw,info_json):
		print(raw)
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
			self.total = self.parse_total_pd()
		elif self.market == 'Lidl':
			self.parse_items_lidl()

		self.date = self.parse_date()
		if self.total == None or self.total == 0:
			self.total = 0
			for item in self.items.keys():
				self.total += self.items[item][1]

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
				self.items[itemName] = [1,round(value,2)]

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
				self.items[itemName] = [1,round(value,2)]
			
	def parse_items_pd(self):
		jump = 0
		for i,line in enumerate(self.lines):
			if SequenceMatcher(None,'resumo',line).ratio() > 0.8:
				break
			if jump > 0:
				jump -= 1
				continue
			match = re.search(pdItemRE,line)
			matchNoPrice = re.search(noPricePDItemRE,line)
			if match:
				value = 0
				itemName = match.group(2)
				alpha = 0
				for c in itemName:
					if (c.isalpha()):
						alpha+=1
				if alpha < (len(itemName) - alpha):
					continue
				if i < len(self.lines-1):
					if SequenceMatcher('poupancaimediata', re.sub(r'[^a-zA-Z]','',self.lines[i+1])).ratio() > 0.85:
						ivalue = float(match.group(4).replace(',','.').replace(' ',''))
						matchP = re.search(valueRE,self.lines[i+1])
						if matchP:
							pvalue = float(matchP.group(0).replace(',','.').replace(' ',''))
							value = ivalue-pvalue
							jump += 1
					else:
						value = float(match.group(4).replace(',','.').replace(' ',''))
				self.items[itemName] = [1,round(value,2)]
			elif matchNoPrice:
				itemName = matchNoPrice.group(2)
				if i < len(self.lines-1):
					matchQtd = re.search(qtdRE,self.lines[i+1])
					if matchQtd:
						try:
							qtd = int(matchQtd.group(1).replace(' ',''))
						except:
							qtd = 1
						value = float(matchQtd.group(3).replace(',','.').replace(' ',''))
						if i < len(self.lines-2):
							if SequenceMatcher('poupancaimediata', re.sub(r'[^a-zA-Z]','',self.lines[i+2])).ratio() > 0.85:
								matchP = re.search(valueRE,self.lines[i+1])
								if matchP:
									pvalue = float(matchP.group(0).replace(',','.').replace(' ',''))
									value -= pvalue
								jump += 1

						jump += 1
				self.items[itemName] = [qtd,round(value,2)]
						

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

		if date_str == None:
			date_str = datetime.today().strftime('%d-%m-%Y')

		return date_str

	def parse_total_pd(self):
		for line in self.lines:
			m = re.search(pdTotalRE,line)
			if m:
				if SequenceMatcher(None,m.group(1),"total a pagar").ratio() > 0.9:
					return float(m.group(3).replace(',','.').replace(' ',''))
		return None

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
	print("R1 Lines")
	print(r1.lines)
	l2 = r2.lines
	print("R2 Lines")
	print(r2.lines)

	newlines = []

	for line2 in l2:
		found = False
		for line1 in l1:
			ratio = SequenceMatcher(None,line1,line2).ratio()
			if ratio > 0.9:
				found = True
		if not found:		
			newlines.append(line2)
				

	nl = l1 + newlines
	r1.lines = nl 
	print("Final R1")
	print(r1.lines)
	
	return r1.parse()
	
				
def parseImage(files):
	preProc = [pp.scaling,pp.normalize,pp.remove_noise,pp.remove_shadows]
	if len(files) == 1:
		filename = files[0]
		image = pp.cv2.imread(filename)
		if debug: pp.show(image,'Original')


		raw = pp.generate_text('out',pp.pipeline(image,preProc),output)
		r = Receipt(raw,'info.json')
	
		return r.parse()

	else:
		filename0 = files[0] 
		image0 = pp.cv2.imread(filename0)
		raw0 = pp.generate_text('out',pp.pipeline(image0,preProc),output)
		r0 = Receipt(raw0,'info.json')
		
		filename1 = files[1] 
		image1 = pp.cv2.imread(filename1)
		raw1 = pp.generate_text('out',pp.pipeline(image1,preProc),output)
		r1 = Receipt(raw1,'info.json')
		
		return concat(r0,r1)





if __name__ == '__main__':
	filename,debug,output = pp.parse()
	preProc = [pp.scaling,pp.normalize,pp.remove_noise,pp.remove_shadows]

	image = pp.cv2.imread(filename)
	if debug: pp.show(image,'Original')

	raw = pp.generate_text('out',pp.pipeline(image,preProc),output)
	r = Receipt(raw,'info.json')

	print(r.parse())

