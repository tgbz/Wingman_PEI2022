import re



dateRE = r'(\d{2}\/\d{2}\/\d{4})'

pdItemRE = r'(\S+) ([a-zA-Z].+)\s( |)((\d|\d{2}),(\d{2}|\d{3}))\s'



class Receipt():
	def __init__(self,raw):
		self.raw = raw
		self.market = None
		self.items = None
		self.date = None