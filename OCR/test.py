from difflib import get_close_matches
import dateutil.parser
import re
import json

dateRE = r'(\d{2}\/\d{2}\/\d{4})'

pdItemRE = r'(\S+) ([a-zA-Z].+)\s( |)((\d|\d{2}),(\d{2}|\d{3}))\s'

totalRE = r'\d+(\.\s?|,\s?|[^a-zA-Z\d])\d{2}'

lines = ['pingodoce',
'VILA VERDE',
'Tel.: 253310870',
'pingo = Distribuição Alimentar, S.A.',
'Sede: R Actor António Silva,N7, 1649-033 Lisboa',
'Rogisto C.R.C. Lisboa-Matrícula/NIPC: 500829993',
'ANREEE: PTOO1730 \ C. Social: 33.808. 115 EUR',
'Artigos',
'MERCEARIA + PET FOOD',
'E 23% PIP DOCES PD150G+25% 0,85',
'E 23% PRINGLES ORIG. 175G 2,65',
'Poupanca Imediata (0,67)',
'E 23% CHEETOS ROL 100 GR 1,65',
'Poupanca Imediata (0, 42)',
'BEBIDAS',
'E 23% LIMA LIMAO PD 2LT 0,89',
'E 23% VODKA ERISTOFF 70CL 12,99',
'Poupanca Imediata (2,60)',
'E 23% C.SUPERBOCK 30X25CL 26,99',
'Poupanca Imediata (13, 50)',
'Resumo',
'TOTAL 46,02',
'TOTAL POUPANCA (17,19)',
'TOTAL A PAGAR 28,83',
'Pagamentos',
'TOTAL PAGO 28,83',
'Multibanco 28,83',
'Resumo IVA',
'Taxa Valor s/IVA Valor IVA Valor c/IVA',
'E 23% 23,44 5,39 28,83',
'NESTA COMPRA POUPOU',
'17.19 €',
'Atendido por: Self Checkout 1',
'ttF6-Processado por programa certificado 369/AT',
'Fatura Simplificada FS 06690902201010618/012012',
'1ª Via Original Data de emissão: 17/10/2022',
'N. Contribuinte:',
'Nome..........: Consumidor final']

linesLower = []

for l in lines:
    linesLower.append(l.lower())

print(linesLower)

keyword = 'pingo doce'
'''#lines = ['anfwijmkd','adm jul','abjulio', 'julio']
for line in linesLower:
    words = line.split()
    # Get the single best match in line
    matches = get_close_matches(keyword, words, 1, 0.6)
''' 
'''for line in linesLower:
    words = line.split()
    #print(keyword,'\n',words)
    matches = get_close_matches(keyword, words, 1, 0.6)
    if matches:
        print(words)'''

matches = get_close_matches('pingo doce', ['pingo', 'doce', '=', 'dintribuledo', 'alimentar,', '9a.'], 1, 0.6)
print(matches)



'''
for line in lines:
    match = re.search(dateRE, line)
    if match:
        date_str = match.group(1)
        date_str = date_str.replace(" ", "")
        try:
            dateutil.parser.parse(date_str)
        except ValueError:
            print("Erro")
        print(date_str)


object_data = {
        "date": date_str
    }
print(json.dumps(object_data))

# Opening JSON file
f = open('markets.json')
  
# returns JSON object as 
# a dictionary
data = json.load(f)
  
# Iterating through the json
# list
for i in data:
    print(i)
    for ii in data[i]:
        print(ii)'''