# run this file
file = open( "demo-0.txt" )
line1 = file.readline().strip()
unicode_line1 = line1.decode( "utf-8" )

print "Physically the content is stored in", len(line1), "bytes"
print "Logically the content consists of", len(unicode_line1), "characters"

print type( line1 ) # string, normal python byte string
print line1

print type( unicode_line1 ) # Unicode string, normal python byte string
print unicode_line1.encode( "utf-8" ) # encode to utf-8, IVLE console output encoding is UTF-8

