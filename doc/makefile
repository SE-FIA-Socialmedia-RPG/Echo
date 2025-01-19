MAIN = Dokumentation
SOURCES = $(MAIN).tex references.bib

PDFLATEX = pdflatex
BIBTEX = bibtex
MAKEGLOSSARIES = makeglossaries

all: $(MAIN).pdf

$(MAIN).pdf: $(SOURCES)
	$(PDFLATEX) $(MAIN)
	$(BIBTEX) $(MAIN)
	$(MAKEGLOSSARIES) $(MAIN)
	$(PDFLATEX) $(MAIN)
	$(PDFLATEX) $(MAIN)

clean:
	rm -f *.aux *.log *.toc *.bbl *.blg *.glg *.glo *.gls *.ist *.acn *.acr *.alg *.out *.lof *.lot

distclean: clean
	rm -f $(MAIN).pdf
