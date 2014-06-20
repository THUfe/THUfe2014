﻿var decryptElementId;

function decryptText(decrypta, decryptb, decryptc) {
	decryptElementId = decrypta;
	if (decryptb == null) {
		decryptb = "四位数字，你知道的(*╯3╰)"
	}
	if (decryptc != null && decryptc) {
		var d = prompt(decryptb, "");
		decrypt(d)
	} else {
		vcPrompt(decryptb, decrypt)
	}
}

function decrypt(a) {
	if (a != "" && a != null) {
		if (decryptElementId.constructor != Array) {
			decryptElementId = [decryptElementId]
		}
		var b = false;
		for (var i = 0; i < decryptElementId.length; i++) {
			var c = document.getElementById(decryptElementId[i]);
			var d = c.title;
			try {
				var e = GibberishAES.dec(d, a);
				b = true;
				c.innerHTML = e;
				c.title = ""
			} catch (err) {}
		}
		if (!b) {
			alert("Invalid decryption key", "Tips")
		}
	}
}
var overlayElt = null;
var winElt = null;
var passElt = null;
var promptElt = null;

function vcPrompt(a) {
	if (overlayElt == null || winElt == null || passElt == null || promptElt == null) {
		vcCreateDialog(a)
	}
	promptElt.innerHTML = a != null ? a : "Enter password:";
	pageSize = getPageSize();
	winElt.style.marginTop = Math.round(pageSize[3] * 0.3) + "px";
	winElt.style.marginLeft = Math.round((pageSize[2] - 400) / 2) + "px";
	isIE6 = /msie|MSIE 6/.test(navigator.userAgent);
	if (isIE6) {
		pageScroll = getPageScroll();
		overlayElt.style.position = "absolute";
		overlayElt.style.width = pageSize[0] + "px";
		overlayElt.style.height = pageSize[1] + "px";
		winElt.style.position = "absolute";
		winElt.style.top = pageScroll[1] + "px";
		winElt.style.left = pageScroll[0] + "px"
	}
	passElt.value = "";
	overlayElt.style.display = "block";
	winElt.style.display = "block";
	passElt.focus();
	passElt.select()
}

function vcCreateDialog() {
	overlayElt = document.createElement("div");
	overlayElt.setAttribute("id", "vcOverlay");
	var s = overlayElt.style;
	s.backgroundColor = "black";
	s.MozOpacity = 0.1;
	s.opacity = 0.1;
	s.filter = "alpha(opacity=10)";
	s.position = "fixed";
	s.top = 0;
	s.left = 0;
	s.width = "100%";
	s.height = "100%";
	s.zIndex = 254;
	s.textAlign = "left";
	s.margin = 0;
	s.padding = 0;
	var a = document.getElementsByTagName("body").item(0);
	a.insertBefore(overlayElt, a.firstChild);
	winElt = document.createElement("div");
	winElt.setAttribute("id", "vcWin");
	s = winElt.style;
	s.position = "fixed";
	s.top = 0;
	s.left = 0;
	s.width = "400px";
	s.zIndex = 255;
	s.border = "1px solid black";
	s.backgroundColor = "#fbfcfd";
	s.textAlign = "left";
	s.margin = 0;
	s.padding = 0;
	a.insertBefore(winElt, a.firstChild);
	var b = document.createElement("div");
	b.setAttribute("id", "vcInWin");
	s = b.style;
	s.border = "5px solid #808080";
	s.padding = "15px";
	s.margin = 0;
	winElt.appendChild(b);
	promptElt = document.createElement("p");
	promptElt.setAttribute("id", "vcPrompt");
	s = promptElt.style;
	s.padding = 0;
	s.margin = 0;
	s.fontFamily = "Arial, sans-serif";
	s.fontSize = "14px";
	s.textAlign = "left";
	s.color = "black";
	b.appendChild(promptElt);
	passElt = document.createElement("input");
	passElt.setAttribute("id", "vcPass");
	passElt.type = "text";
	passElt.onkeydown = function(c) {
		if (c == null) {
			c = window.event
		}
		if ((c.keyCode == 10) || (c.keyCode == 13)) {
			vcClick(1)
		}
		if (c.keyCode == 27) {
			vcClick(0)
		}
	};
	s = passElt.style;
	s.position = "relative";
	s.width = "345px";
	s.padding = "5px";
	s.margin = "5px 0 10px 0";
	s.fontFamily = "monospace";
	s.fontSize = "14px";
	s.textAlign = "left";
	s.color = "black";
	s.border = "2px solid #808080";
	s.backgroundColor = "white";
	b.appendChild(passElt);
	var c = document.createElement("div");
	c.style.textAlign = "right";
	c.style.fontFamily = "Arial, sans-serif";
	c.style.fontSize = "14px";
	b.appendChild(c);
	var d = document.createElement("input");
	d.type = "button";
	d.value = "OK";
	d.onclick = function() {
		vcClick(1)
	};
	d.style.margin = "0 0 0 0.5em";
	d.style.padding = "5px";
	d.style.color = "black";
	c.appendChild(d);
	d = document.createElement("input");
	d.type = "button";
	d.value = "Cancel";
	d.onclick = function() {
		vcClick(0)
	};
	d.style.margin = "0 0 0 0.5em";
	d.style.padding = "5px";
	d.style.color = "black";
	c.appendChild(d)
}

function vcClick(a) {
	overlayElt.style.display = "none";
	winElt.style.display = "none";
	if (a) {
		decrypt(passElt.value)
	} else {
		window.location.href='index.html';
	}
}

function getPageScroll() {
	var a;
	if (self.pageYOffset) {
		a = self.pageYOffset
	} else {
		if (document.documentElement && document.documentElement.scrollTop) {
			a = document.documentElement.scrollTop
		} else {
			if (document.body) {
				a = document.body.scrollTop
			}
		}
	}
	var b;
	if (self.pageXOffset) {
		b = self.pageXOffset
	} else {
		if (document.documentElement && document.documentElement.scrollLeft) {
			b = document.documentElement.scrollLeft
		} else {
			if (document.body) {
				b = document.body.scrollLeft
			}
		}
	}
	arrayPageScroll = new Array(b, a);
	return arrayPageScroll
}

function getPageSize() {
	var a, b;
	if (window.innerHeight && window.scrollMaxY) {
		a = document.body.scrollWidth;
		b = window.innerHeight + window.scrollMaxY
	} else {
		if (document.body.scrollHeight > document.body.offsetHeight) {
			a = document.body.scrollWidth;
			b = document.body.scrollHeight
		} else {
			a = document.body.offsetWidth;
			b = document.body.offsetHeight
		}
	}
	var c, d;
	if (self.innerHeight) {
		c = self.innerWidth;
		d = self.innerHeight
	} else {
		if (document.documentElement && document.documentElement.clientHeight) {
			c = document.documentElement.clientWidth;
			d = document.documentElement.clientHeight
		} else {
			if (document.body) {
				c = document.body.clientWidth;
				d = document.body.clientHeight
			}
		}
	} if (b < d) {
		pageHeight = d
	} else {
		pageHeight = b
	} if (a < c) {
		pageWidth = c
	} else {
		pageWidth = a
	}
	arrayPageSize = new Array(pageWidth, pageHeight, c, d);
	return arrayPageSize
}
var GibberishAES = {
	Nr: 14,
	Nb: 4,
	Nk: 8,
	Decrypt: false,
	enc_utf8: function(s) {
		try {
			return unescape(encodeURIComponent(s))
		} catch (e) {
			throw "Error on UTF-8 encode"
		}
	},
	dec_utf8: function(s) {
		try {
			return decodeURIComponent(escape(s))
		} catch (e) {
			throw ("Bad Key")
		}
	},
	padBlock: function(a) {
		var b = [];
		if (a.length < 16) {
			var c = 16 - a.length;
			var b = [c, c, c, c, c, c, c, c, c, c, c, c, c, c, c, c]
		}
		for (var i = 0; i < a.length; i++) {
			b[i] = a[i]
		}
		return b
	},
	block2s: function(a, b) {
		if (a == undefined) {
			throw ("Decryption error: Maybe bad cipher")
		}
		var c = "";
		if (b) {
			var d = a[15];
			if (d > 16) {
				throw ("Decryption error: Maybe bad key")
			}
			if (d == 16) {
				return ""
			}
			for (var i = 0; i < 16 - d; i++) {
				c += String.fromCharCode(a[i])
			}
		} else {
			for (i = 0; i < 16; i++) {
				c += String.fromCharCode(a[i])
			}
		}
		return c
	},
	a2h: function(a) {
		var b = "";
		for (var i = 0; i < a.length; i++) {
			b += (a[i] < 16 ? "0" : "") + a[i].toString(16)
		}
		return b
	},
	h2a: function(s) {
		var a = [];
		s.replace(/(..)/g, function(b) {
			a.push(parseInt(b, 16))
		});
		return a
	},
	s2a: function(a) {
		a = this.enc_utf8(a);
		var b = [];
		for (var i = 0; i < a.length; i++) {
			b[i] = a.charCodeAt(i)
		}
		return b
	},
	size: function(a) {
		switch (a) {
			case 128:
				this.Nr = 10;
				this.Nk = 4;
				break;
			case 192:
				this.Nr = 12;
				this.Nk = 6;
				break;
			case 256:
				this.Nr = 14;
				this.Nk = 8;
				break;
			default:
				throw ("Invalid Key Size Specified:" + a)
		}
	},
	randArr: function(a) {
		var b = [];
		for (var i = 0; i < a; i++) {
			b = b.concat(Math.floor(Math.random() * 256))
		}
		return b
	},
	openSSLKey: function(a, b) {
		var c = this.Nr >= 12 ? 3 : 2;
		var d = [];
		var e = [];
		var f = [];
		var g = [];
		data00 = a.concat(b);
		f[0] = GibberishAES.Hash.MD5(data00);
		g = f[0];
		for (var i = 1; i < c; i++) {
			f[i] = GibberishAES.Hash.MD5(f[i - 1].concat(data00));
			g = g.concat(f[i])
		}
		d = g.slice(0, 4 * this.Nk);
		e = g.slice(4 * this.Nk, 4 * this.Nk + 16);
		return {
			key: d,
			iv: e
		}
	},
	rawEncrypt: function(a, b, c) {
		b = this.expandKey(b);
		var d = Math.ceil(a.length / 16);
		var e = [];
		for (var i = 0; i < d; i++) {
			e[i] = this.padBlock(a.slice(i * 16, i * 16 + 16))
		}
		if (a.length % 16 === 0) {
			e.push([16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16]);
			d++
		}
		var f = [];
		for (var i = 0; i < e.length; i++) {
			e[i] = (i === 0) ? this.xorBlocks(e[i], c) : this.xorBlocks(e[i], f[i - 1]);
			f[i] = this.encryptBlock(e[i], b)
		}
		return f
	},
	rawDecrypt: function(a, b, c) {
		b = this.expandKey(b);
		var d = a.length / 16;
		var e = [];
		for (var i = 0; i < d; i++) {
			e.push(a.slice(i * 16, (i + 1) * 16))
		}
		var f = [];
		for (var i = e.length - 1; i >= 0; i--) {
			f[i] = this.decryptBlock(e[i], b);
			f[i] = (i === 0) ? this.xorBlocks(f[i], c) : this.xorBlocks(f[i], e[i - 1])
		}
		var g = "";
		for (var i = 0; i < d - 1; i++) {
			g += this.block2s(f[i])
		}
		g += this.block2s(f[i], true);
		return this.dec_utf8(g)
	},
	encryptBlock: function(a, b) {
		this.Decrypt = false;
		var c = this.addRoundKey(a, b, 0);
		for (var d = 1; d < (this.Nr + 1); d++) {
			c = this.subBytes(c);
			c = this.shiftRows(c);
			if (d < this.Nr) {
				c = this.mixColumns(c)
			}
			c = this.addRoundKey(c, b, d)
		}
		return c
	},
	decryptBlock: function(a, b) {
		this.Decrypt = true;
		var c = this.addRoundKey(a, b, this.Nr);
		for (var d = this.Nr - 1; d > -1; d--) {
			c = this.shiftRows(c);
			c = this.subBytes(c);
			c = this.addRoundKey(c, b, d);
			if (d > 0) {
				c = this.mixColumns(c)
			}
		}
		return c
	},
	subBytes: function(a) {
		var S = this.Decrypt ? this.SBoxInv : this.SBox;
		var b = [];
		for (var i = 0; i < 16; i++) {
			b[i] = S[a[i]]
		}
		return b
	},
	shiftRows: function(a) {
		var b = [];
		var c = this.Decrypt ? [0, 13, 10, 7, 4, 1, 14, 11, 8, 5, 2, 15, 12, 9, 6, 3] : [0, 5, 10, 15, 4, 9, 14, 3, 8, 13, 2, 7, 12, 1, 6, 11];
		for (var i = 0; i < 16; i++) {
			b[i] = a[c[i]]
		}
		return b
	},
	mixColumns: function(a) {
		var t = [];
		if (!this.Decrypt) {
			for (var c = 0; c < 4; c++) {
				t[c * 4] = this.G2X[a[c * 4]] ^ this.G3X[a[1 + c * 4]] ^ a[2 + c * 4] ^ a[3 + c * 4];
				t[1 + c * 4] = a[c * 4] ^ this.G2X[a[1 + c * 4]] ^ this.G3X[a[2 + c * 4]] ^ a[3 + c * 4];
				t[2 + c * 4] = a[c * 4] ^ a[1 + c * 4] ^ this.G2X[a[2 + c * 4]] ^ this.G3X[a[3 + c * 4]];
				t[3 + c * 4] = this.G3X[a[c * 4]] ^ a[1 + c * 4] ^ a[2 + c * 4] ^ this.G2X[a[3 + c * 4]]
			}
		} else {
			for (var c = 0; c < 4; c++) {
				t[c * 4] = this.GEX[a[c * 4]] ^ this.GBX[a[1 + c * 4]] ^ this.GDX[a[2 + c * 4]] ^ this.G9X[a[3 + c * 4]];
				t[1 + c * 4] = this.G9X[a[c * 4]] ^ this.GEX[a[1 + c * 4]] ^ this.GBX[a[2 + c * 4]] ^ this.GDX[a[3 + c * 4]];
				t[2 + c * 4] = this.GDX[a[c * 4]] ^ this.G9X[a[1 + c * 4]] ^ this.GEX[a[2 + c * 4]] ^ this.GBX[a[3 + c * 4]];
				t[3 + c * 4] = this.GBX[a[c * 4]] ^ this.GDX[a[1 + c * 4]] ^ this.G9X[a[2 + c * 4]] ^ this.GEX[a[3 + c * 4]]
			}
		}
		return t
	},
	addRoundKey: function(a, b, c) {
		var d = [];
		for (var i = 0; i < 16; i++) {
			d[i] = a[i] ^ b[c][i]
		}
		return d
	},
	xorBlocks: function(a, b) {
		var c = [];
		for (var i = 0; i < 16; i++) {
			c[i] = a[i] ^ b[i]
		}
		return c
	},
	expandKey: function(a) {
		var b = this.Nb;
		var c = this.Nr;
		var d = this.Nk;
		var w = [];
		var e = [];
		for (var i = 0; i < d; i++) {
			var r = [a[4 * i], a[4 * i + 1], a[4 * i + 2], a[4 * i + 3]];
			w[i] = r
		}
		for (var i = d; i < (4 * (c + 1)); i++) {
			w[i] = [];
			for (var t = 0; t < 4; t++) {
				e[t] = w[i - 1][t]
			}
			if (i % d === 0) {
				e = this.subWord(this.rotWord(e));
				e[0] ^= this.Rcon[i / d - 1]
			} else {
				if (d > 6 && i % d == 4) {
					e = this.subWord(e)
				}
			}
			for (var t = 0; t < 4; t++) {
				w[i][t] = w[i - d][t] ^ e[t]
			}
		}
		var f = [];
		for (var i = 0; i < (c + 1); i++) {
			f[i] = [];
			for (var j = 0; j < 4; j++) {
				f[i].push(w[i * 4 + j][0], w[i * 4 + j][1], w[i * 4 + j][2], w[i * 4 + j][3])
			}
		}
		return f
	},
	subWord: function(w) {
		for (var i = 0; i < 4; i++) {
			w[i] = this.SBox[w[i]]
		}
		return w
	},
	rotWord: function(w) {
		var a = w[0];
		for (var i = 0; i < 4; i++) {
			w[i] = w[i + 1]
		}
		w[3] = a;
		return w
	},
	SBox: [99, 124, 119, 123, 242, 107, 111, 197, 48, 1, 103, 43, 254, 215, 171, 118, 202, 130, 201, 125, 250, 89, 71, 240, 173, 212, 162, 175, 156, 164, 114, 192, 183, 253, 147, 38, 54, 63, 247, 204, 52, 165, 229, 241, 113, 216, 49, 21, 4, 199, 35, 195, 24, 150, 5, 154, 7, 18, 128, 226, 235, 39, 178, 117, 9, 131, 44, 26, 27, 110, 90, 160, 82, 59, 214, 179, 41, 227, 47, 132, 83, 209, 0, 237, 32, 252, 177, 91, 106, 203, 190, 57, 74, 76, 88, 207, 208, 239, 170, 251, 67, 77, 51, 133, 69, 249, 2, 127, 80, 60, 159, 168, 81, 163, 64, 143, 146, 157, 56, 245, 188, 182, 218, 33, 16, 255, 243, 210, 205, 12, 19, 236, 95, 151, 68, 23, 196, 167, 126, 61, 100, 93, 25, 115, 96, 129, 79, 220, 34, 42, 144, 136, 70, 238, 184, 20, 222, 94, 11, 219, 224, 50, 58, 10, 73, 6, 36, 92, 194, 211, 172, 98, 145, 149, 228, 121, 231, 200, 55, 109, 141, 213, 78, 169, 108, 86, 244, 234, 101, 122, 174, 8, 186, 120, 37, 46, 28, 166, 180, 198, 232, 221, 116, 31, 75, 189, 139, 138, 112, 62, 181, 102, 72, 3, 246, 14, 97, 53, 87, 185, 134, 193, 29, 158, 225, 248, 152, 17, 105, 217, 142, 148, 155, 30, 135, 233, 206, 85, 40, 223, 140, 161, 137, 13, 191, 230, 66, 104, 65, 153, 45, 15, 176, 84, 187, 22],
	SBoxInv: [82, 9, 106, 213, 48, 54, 165, 56, 191, 64, 163, 158, 129, 243, 215, 251, 124, 227, 57, 130, 155, 47, 255, 135, 52, 142, 67, 68, 196, 222, 233, 203, 84, 123, 148, 50, 166, 194, 35, 61, 238, 76, 149, 11, 66, 250, 195, 78, 8, 46, 161, 102, 40, 217, 36, 178, 118, 91, 162, 73, 109, 139, 209, 37, 114, 248, 246, 100, 134, 104, 152, 22, 212, 164, 92, 204, 93, 101, 182, 146, 108, 112, 72, 80, 253, 237, 185, 218, 94, 21, 70, 87, 167, 141, 157, 132, 144, 216, 171, 0, 140, 188, 211, 10, 247, 228, 88, 5, 184, 179, 69, 6, 208, 44, 30, 143, 202, 63, 15, 2, 193, 175, 189, 3, 1, 19, 138, 107, 58, 145, 17, 65, 79, 103, 220, 234, 151, 242, 207, 206, 240, 180, 230, 115, 150, 172, 116, 34, 231, 173, 53, 133, 226, 249, 55, 232, 28, 117, 223, 110, 71, 241, 26, 113, 29, 41, 197, 137, 111, 183, 98, 14, 170, 24, 190, 27, 252, 86, 62, 75, 198, 210, 121, 32, 154, 219, 192, 254, 120, 205, 90, 244, 31, 221, 168, 51, 136, 7, 199, 49, 177, 18, 16, 89, 39, 128, 236, 95, 96, 81, 127, 169, 25, 181, 74, 13, 45, 229, 122, 159, 147, 201, 156, 239, 160, 224, 59, 77, 174, 42, 245, 176, 200, 235, 187, 60, 131, 83, 153, 97, 23, 43, 4, 126, 186, 119, 214, 38, 225, 105, 20, 99, 85, 33, 12, 125],
	Rcon: [1, 2, 4, 8, 16, 32, 64, 128, 27, 54, 108, 216, 171, 77, 154, 47, 94, 188, 99, 198, 151, 53, 106, 212, 179, 125, 250, 239, 197, 145],
	G2X: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110, 112, 114, 116, 118, 120, 122, 124, 126, 128, 130, 132, 134, 136, 138, 140, 142, 144, 146, 148, 150, 152, 154, 156, 158, 160, 162, 164, 166, 168, 170, 172, 174, 176, 178, 180, 182, 184, 186, 188, 190, 192, 194, 196, 198, 200, 202, 204, 206, 208, 210, 212, 214, 216, 218, 220, 222, 224, 226, 228, 230, 232, 234, 236, 238, 240, 242, 244, 246, 248, 250, 252, 254, 27, 25, 31, 29, 19, 17, 23, 21, 11, 9, 15, 13, 3, 1, 7, 5, 59, 57, 63, 61, 51, 49, 55, 53, 43, 41, 47, 45, 35, 33, 39, 37, 91, 89, 95, 93, 83, 81, 87, 85, 75, 73, 79, 77, 67, 65, 71, 69, 123, 121, 127, 125, 115, 113, 119, 117, 107, 105, 111, 109, 99, 97, 103, 101, 155, 153, 159, 157, 147, 145, 151, 149, 139, 137, 143, 141, 131, 129, 135, 133, 187, 185, 191, 189, 179, 177, 183, 181, 171, 169, 175, 173, 163, 161, 167, 165, 219, 217, 223, 221, 211, 209, 215, 213, 203, 201, 207, 205, 195, 193, 199, 197, 251, 249, 255, 253, 243, 241, 247, 245, 235, 233, 239, 237, 227, 225, 231, 229],
	G3X: [0, 3, 6, 5, 12, 15, 10, 9, 24, 27, 30, 29, 20, 23, 18, 17, 48, 51, 54, 53, 60, 63, 58, 57, 40, 43, 46, 45, 36, 39, 34, 33, 96, 99, 102, 101, 108, 111, 106, 105, 120, 123, 126, 125, 116, 119, 114, 113, 80, 83, 86, 85, 92, 95, 90, 89, 72, 75, 78, 77, 68, 71, 66, 65, 192, 195, 198, 197, 204, 207, 202, 201, 216, 219, 222, 221, 212, 215, 210, 209, 240, 243, 246, 245, 252, 255, 250, 249, 232, 235, 238, 237, 228, 231, 226, 225, 160, 163, 166, 165, 172, 175, 170, 169, 184, 187, 190, 189, 180, 183, 178, 177, 144, 147, 150, 149, 156, 159, 154, 153, 136, 139, 142, 141, 132, 135, 130, 129, 155, 152, 157, 158, 151, 148, 145, 146, 131, 128, 133, 134, 143, 140, 137, 138, 171, 168, 173, 174, 167, 164, 161, 162, 179, 176, 181, 182, 191, 188, 185, 186, 251, 248, 253, 254, 247, 244, 241, 242, 227, 224, 229, 230, 239, 236, 233, 234, 203, 200, 205, 206, 199, 196, 193, 194, 211, 208, 213, 214, 223, 220, 217, 218, 91, 88, 93, 94, 87, 84, 81, 82, 67, 64, 69, 70, 79, 76, 73, 74, 107, 104, 109, 110, 103, 100, 97, 98, 115, 112, 117, 118, 127, 124, 121, 122, 59, 56, 61, 62, 55, 52, 49, 50, 35, 32, 37, 38, 47, 44, 41, 42, 11, 8, 13, 14, 7, 4, 1, 2, 19, 16, 21, 22, 31, 28, 25, 26],
	G9X: [0, 9, 18, 27, 36, 45, 54, 63, 72, 65, 90, 83, 108, 101, 126, 119, 144, 153, 130, 139, 180, 189, 166, 175, 216, 209, 202, 195, 252, 245, 238, 231, 59, 50, 41, 32, 31, 22, 13, 4, 115, 122, 97, 104, 87, 94, 69, 76, 171, 162, 185, 176, 143, 134, 157, 148, 227, 234, 241, 248, 199, 206, 213, 220, 118, 127, 100, 109, 82, 91, 64, 73, 62, 55, 44, 37, 26, 19, 8, 1, 230, 239, 244, 253, 194, 203, 208, 217, 174, 167, 188, 181, 138, 131, 152, 145, 77, 68, 95, 86, 105, 96, 123, 114, 5, 12, 23, 30, 33, 40, 51, 58, 221, 212, 207, 198, 249, 240, 235, 226, 149, 156, 135, 142, 177, 184, 163, 170, 236, 229, 254, 247, 200, 193, 218, 211, 164, 173, 182, 191, 128, 137, 146, 155, 124, 117, 110, 103, 88, 81, 74, 67, 52, 61, 38, 47, 16, 25, 2, 11, 215, 222, 197, 204, 243, 250, 225, 232, 159, 150, 141, 132, 187, 178, 169, 160, 71, 78, 85, 92, 99, 106, 113, 120, 15, 6, 29, 20, 43, 34, 57, 48, 154, 147, 136, 129, 190, 183, 172, 165, 210, 219, 192, 201, 246, 255, 228, 237, 10, 3, 24, 17, 46, 39, 60, 53, 66, 75, 80, 89, 102, 111, 116, 125, 161, 168, 179, 186, 133, 140, 151, 158, 233, 224, 251, 242, 205, 196, 223, 214, 49, 56, 35, 42, 21, 28, 7, 14, 121, 112, 107, 98, 93, 84, 79, 70],
	GBX: [0, 11, 22, 29, 44, 39, 58, 49, 88, 83, 78, 69, 116, 127, 98, 105, 176, 187, 166, 173, 156, 151, 138, 129, 232, 227, 254, 245, 196, 207, 210, 217, 123, 112, 109, 102, 87, 92, 65, 74, 35, 40, 53, 62, 15, 4, 25, 18, 203, 192, 221, 214, 231, 236, 241, 250, 147, 152, 133, 142, 191, 180, 169, 162, 246, 253, 224, 235, 218, 209, 204, 199, 174, 165, 184, 179, 130, 137, 148, 159, 70, 77, 80, 91, 106, 97, 124, 119, 30, 21, 8, 3, 50, 57, 36, 47, 141, 134, 155, 144, 161, 170, 183, 188, 213, 222, 195, 200, 249, 242, 239, 228, 61, 54, 43, 32, 17, 26, 7, 12, 101, 110, 115, 120, 73, 66, 95, 84, 247, 252, 225, 234, 219, 208, 205, 198, 175, 164, 185, 178, 131, 136, 149, 158, 71, 76, 81, 90, 107, 96, 125, 118, 31, 20, 9, 2, 51, 56, 37, 46, 140, 135, 154, 145, 160, 171, 182, 189, 212, 223, 194, 201, 248, 243, 238, 229, 60, 55, 42, 33, 16, 27, 6, 13, 100, 111, 114, 121, 72, 67, 94, 85, 1, 10, 23, 28, 45, 38, 59, 48, 89, 82, 79, 68, 117, 126, 99, 104, 177, 186, 167, 172, 157, 150, 139, 128, 233, 226, 255, 244, 197, 206, 211, 216, 122, 113, 108, 103, 86, 93, 64, 75, 34, 41, 52, 63, 14, 5, 24, 19, 202, 193, 220, 215, 230, 237, 240, 251, 146, 153, 132, 143, 190, 181, 168, 163],
	GDX: [0, 13, 26, 23, 52, 57, 46, 35, 104, 101, 114, 127, 92, 81, 70, 75, 208, 221, 202, 199, 228, 233, 254, 243, 184, 181, 162, 175, 140, 129, 150, 155, 187, 182, 161, 172, 143, 130, 149, 152, 211, 222, 201, 196, 231, 234, 253, 240, 107, 102, 113, 124, 95, 82, 69, 72, 3, 14, 25, 20, 55, 58, 45, 32, 109, 96, 119, 122, 89, 84, 67, 78, 5, 8, 31, 18, 49, 60, 43, 38, 189, 176, 167, 170, 137, 132, 147, 158, 213, 216, 207, 194, 225, 236, 251, 246, 214, 219, 204, 193, 226, 239, 248, 245, 190, 179, 164, 169, 138, 135, 144, 157, 6, 11, 28, 17, 50, 63, 40, 37, 110, 99, 116, 121, 90, 87, 64, 77, 218, 215, 192, 205, 238, 227, 244, 249, 178, 191, 168, 165, 134, 139, 156, 145, 10, 7, 16, 29, 62, 51, 36, 41, 98, 111, 120, 117, 86, 91, 76, 65, 97, 108, 123, 118, 85, 88, 79, 66, 9, 4, 19, 30, 61, 48, 39, 42, 177, 188, 171, 166, 133, 136, 159, 146, 217, 212, 195, 206, 237, 224, 247, 250, 183, 186, 173, 160, 131, 142, 153, 148, 223, 210, 197, 200, 235, 230, 241, 252, 103, 106, 125, 112, 83, 94, 73, 68, 15, 2, 21, 24, 59, 54, 33, 44, 12, 1, 22, 27, 56, 53, 34, 47, 100, 105, 126, 115, 80, 93, 74, 71, 220, 209, 198, 203, 232, 229, 242, 255, 180, 185, 174, 163, 128, 141, 154, 151],
	GEX: [0, 14, 28, 18, 56, 54, 36, 42, 112, 126, 108, 98, 72, 70, 84, 90, 224, 238, 252, 242, 216, 214, 196, 202, 144, 158, 140, 130, 168, 166, 180, 186, 219, 213, 199, 201, 227, 237, 255, 241, 171, 165, 183, 185, 147, 157, 143, 129, 59, 53, 39, 41, 3, 13, 31, 17, 75, 69, 87, 89, 115, 125, 111, 97, 173, 163, 177, 191, 149, 155, 137, 135, 221, 211, 193, 207, 229, 235, 249, 247, 77, 67, 81, 95, 117, 123, 105, 103, 61, 51, 33, 47, 5, 11, 25, 23, 118, 120, 106, 100, 78, 64, 82, 92, 6, 8, 26, 20, 62, 48, 34, 44, 150, 152, 138, 132, 174, 160, 178, 188, 230, 232, 250, 244, 222, 208, 194, 204, 65, 79, 93, 83, 121, 119, 101, 107, 49, 63, 45, 35, 9, 7, 21, 27, 161, 175, 189, 179, 153, 151, 133, 139, 209, 223, 205, 195, 233, 231, 245, 251, 154, 148, 134, 136, 162, 172, 190, 176, 234, 228, 246, 248, 210, 220, 206, 192, 122, 116, 102, 104, 66, 76, 94, 80, 10, 4, 22, 24, 50, 60, 46, 32, 236, 226, 240, 254, 212, 218, 200, 198, 156, 146, 128, 142, 164, 170, 184, 182, 12, 2, 16, 30, 52, 58, 40, 38, 124, 114, 96, 110, 68, 74, 88, 86, 55, 57, 43, 37, 15, 1, 19, 29, 71, 73, 91, 85, 127, 113, 99, 109, 215, 217, 203, 197, 239, 225, 243, 253, 167, 169, 187, 181, 159, 145, 131, 141],
	enc: function(a, b) {
		var c = this.randArr(8);
		var d = this.openSSLKey(this.s2a(b), c);
		var e = d.key;
		var f = d.iv;
		a = this.s2a(a);
		var g = this.rawEncrypt(a, e, f);
		var h = [
			[83, 97, 108, 116, 101, 100, 95, 95].concat(c)
		];
		g = h.concat(g);
		return this.Base64.encode(g)
	},
	dec: function(a, b) {
		var c = this.Base64.decode(a);
		var d = c.slice(8, 16);
		var e = this.openSSLKey(this.s2a(b), d);
		var f = e.key;
		var g = e.iv;
		var c = c.slice(16, c.length);
		a = this.rawDecrypt(c, f, g);
		return a
	}
};
GibberishAES.Hash = {
	MD5: function(a) {
		function RotateLeft(b, c) {
			return (b << c) | (b >>> (32 - c))
		}

		function AddUnsigned(b, c) {
			var d, e, f, g, h;
			f = (b & 2147483648);
			g = (c & 2147483648);
			d = (b & 1073741824);
			e = (c & 1073741824);
			h = (b & 1073741823) + (c & 1073741823);
			if (d & e) {
				return (h ^ 2147483648 ^ f ^ g)
			}
			if (d | e) {
				if (h & 1073741824) {
					return (h ^ 3221225472 ^ f ^ g)
				} else {
					return (h ^ 1073741824 ^ f ^ g)
				}
			} else {
				return (h ^ f ^ g)
			}
		}

		function F(x, y, z) {
			return (x & y) | ((~x) & z)
		}

		function G(x, y, z) {
			return (x & z) | (y & (~z))
		}

		function H(x, y, z) {
			return (x ^ y ^ z)
		}

		function I(x, y, z) {
			return (y ^ (x | (~z)))
		}

		function FF(b, c, d, e, x, s, f) {
			b = AddUnsigned(b, AddUnsigned(AddUnsigned(F(c, d, e), x), f));
			return AddUnsigned(RotateLeft(b, s), c)
		}

		function GG(b, c, d, e, x, s, f) {
			b = AddUnsigned(b, AddUnsigned(AddUnsigned(G(c, d, e), x), f));
			return AddUnsigned(RotateLeft(b, s), c)
		}

		function HH(b, c, d, e, x, s, f) {
			b = AddUnsigned(b, AddUnsigned(AddUnsigned(H(c, d, e), x), f));
			return AddUnsigned(RotateLeft(b, s), c)
		}

		function II(b, c, d, e, x, s, f) {
			b = AddUnsigned(b, AddUnsigned(AddUnsigned(I(c, d, e), x), f));
			return AddUnsigned(RotateLeft(b, s), c)
		}

		function ConvertToWordArray(b) {
			var c;
			var d = b.length;
			var e = d + 8;
			var f = (e - (e % 64)) / 64;
			var g = (f + 1) * 16;
			var h = Array(g - 1);
			var i = 0;
			var j = 0;
			while (j < d) {
				c = (j - (j % 4)) / 4;
				i = (j % 4) * 8;
				h[c] = (h[c] | (b[j] << i));
				j++
			}
			c = (j - (j % 4)) / 4;
			i = (j % 4) * 8;
			h[c] = h[c] | (128 << i);
			h[g - 2] = d << 3;
			h[g - 1] = d >>> 29;
			return h
		}

		function WordToHex(b) {
			var c = "",
				d = "",
				e, f;
			var g = [];
			for (f = 0; f <= 3; f++) {
				e = (b >>> (f * 8)) & 255;
				g = g.concat(e)
			}
			return g
		}

		function Utf8Encode(b) {
			b = b.replace(/\r\n/g, "\n");
			var c = "";
			for (var n = 0; n < b.length; n++) {
				var d = b.charCodeAt(n);
				if (d < 128) {
					c += String.fromCharCode(d)
				} else {
					if ((d > 127) && (d < 2048)) {
						c += String.fromCharCode((d >> 6) | 192);
						c += String.fromCharCode((d & 63) | 128)
					} else {
						c += String.fromCharCode((d >> 12) | 224);
						c += String.fromCharCode(((d >> 6) & 63) | 128);
						c += String.fromCharCode((d & 63) | 128)
					}
				}
			}
			return c
		}
		var x = Array();
		var k, b, c, d, e, f, g, h, i;
		var j = 7,
			l = 12,
			m = 17,
			n = 22;
		var o = 5,
			p = 9,
			q = 14,
			r = 20;
		var s = 4,
			t = 11,
			u = 16,
			v = 23;
		var w = 6,
			y = 10,
			z = 15,
			A = 21;
		x = ConvertToWordArray(a);
		f = 1732584193;
		g = 4023233417;
		h = 2562383102;
		i = 271733878;
		for (k = 0; k < x.length; k += 16) {
			b = f;
			c = g;
			d = h;
			e = i;
			f = FF(f, g, h, i, x[k + 0], j, 3614090360);
			i = FF(i, f, g, h, x[k + 1], l, 3905402710);
			h = FF(h, i, f, g, x[k + 2], m, 606105819);
			g = FF(g, h, i, f, x[k + 3], n, 3250441966);
			f = FF(f, g, h, i, x[k + 4], j, 4118548399);
			i = FF(i, f, g, h, x[k + 5], l, 1200080426);
			h = FF(h, i, f, g, x[k + 6], m, 2821735955);
			g = FF(g, h, i, f, x[k + 7], n, 4249261313);
			f = FF(f, g, h, i, x[k + 8], j, 1770035416);
			i = FF(i, f, g, h, x[k + 9], l, 2336552879);
			h = FF(h, i, f, g, x[k + 10], m, 4294925233);
			g = FF(g, h, i, f, x[k + 11], n, 2304563134);
			f = FF(f, g, h, i, x[k + 12], j, 1804603682);
			i = FF(i, f, g, h, x[k + 13], l, 4254626195);
			h = FF(h, i, f, g, x[k + 14], m, 2792965006);
			g = FF(g, h, i, f, x[k + 15], n, 1236535329);
			f = GG(f, g, h, i, x[k + 1], o, 4129170786);
			i = GG(i, f, g, h, x[k + 6], p, 3225465664);
			h = GG(h, i, f, g, x[k + 11], q, 643717713);
			g = GG(g, h, i, f, x[k + 0], r, 3921069994);
			f = GG(f, g, h, i, x[k + 5], o, 3593408605);
			i = GG(i, f, g, h, x[k + 10], p, 38016083);
			h = GG(h, i, f, g, x[k + 15], q, 3634488961);
			g = GG(g, h, i, f, x[k + 4], r, 3889429448);
			f = GG(f, g, h, i, x[k + 9], o, 568446438);
			i = GG(i, f, g, h, x[k + 14], p, 3275163606);
			h = GG(h, i, f, g, x[k + 3], q, 4107603335);
			g = GG(g, h, i, f, x[k + 8], r, 1163531501);
			f = GG(f, g, h, i, x[k + 13], o, 2850285829);
			i = GG(i, f, g, h, x[k + 2], p, 4243563512);
			h = GG(h, i, f, g, x[k + 7], q, 1735328473);
			g = GG(g, h, i, f, x[k + 12], r, 2368359562);
			f = HH(f, g, h, i, x[k + 5], s, 4294588738);
			i = HH(i, f, g, h, x[k + 8], t, 2272392833);
			h = HH(h, i, f, g, x[k + 11], u, 1839030562);
			g = HH(g, h, i, f, x[k + 14], v, 4259657740);
			f = HH(f, g, h, i, x[k + 1], s, 2763975236);
			i = HH(i, f, g, h, x[k + 4], t, 1272893353);
			h = HH(h, i, f, g, x[k + 7], u, 4139469664);
			g = HH(g, h, i, f, x[k + 10], v, 3200236656);
			f = HH(f, g, h, i, x[k + 13], s, 681279174);
			i = HH(i, f, g, h, x[k + 0], t, 3936430074);
			h = HH(h, i, f, g, x[k + 3], u, 3572445317);
			g = HH(g, h, i, f, x[k + 6], v, 76029189);
			f = HH(f, g, h, i, x[k + 9], s, 3654602809);
			i = HH(i, f, g, h, x[k + 12], t, 3873151461);
			h = HH(h, i, f, g, x[k + 15], u, 530742520);
			g = HH(g, h, i, f, x[k + 2], v, 3299628645);
			f = II(f, g, h, i, x[k + 0], w, 4096336452);
			i = II(i, f, g, h, x[k + 7], y, 1126891415);
			h = II(h, i, f, g, x[k + 14], z, 2878612391);
			g = II(g, h, i, f, x[k + 5], A, 4237533241);
			f = II(f, g, h, i, x[k + 12], w, 1700485571);
			i = II(i, f, g, h, x[k + 3], y, 2399980690);
			h = II(h, i, f, g, x[k + 10], z, 4293915773);
			g = II(g, h, i, f, x[k + 1], A, 2240044497);
			f = II(f, g, h, i, x[k + 8], w, 1873313359);
			i = II(i, f, g, h, x[k + 15], y, 4264355552);
			h = II(h, i, f, g, x[k + 6], z, 2734768916);
			g = II(g, h, i, f, x[k + 13], A, 1309151649);
			f = II(f, g, h, i, x[k + 4], w, 4149444226);
			i = II(i, f, g, h, x[k + 11], y, 3174756917);
			h = II(h, i, f, g, x[k + 2], z, 718787259);
			g = II(g, h, i, f, x[k + 9], A, 3951481745);
			f = AddUnsigned(f, b);
			g = AddUnsigned(g, c);
			h = AddUnsigned(h, d);
			i = AddUnsigned(i, e)
		}
		var B = WordToHex(f).concat(WordToHex(g), WordToHex(h), WordToHex(i));
		return B
	}
};
GibberishAES.Base64 = {
	chars: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "/"],
	encode: function(b, a) {
		var c = [];
		var d = "";
		totalChunks = Math.floor(b.length * 16 / 3);
		for (var i = 0; i < b.length * 16; i++) {
			c.push(b[Math.floor(i / 16)][i % 16])
		}
		for (var i = 0; i < c.length; i = i + 3) {
			d += this.chars[c[i] >> 2];
			d += this.chars[((c[i] & 3) << 4) | (c[i + 1] >> 4)];
			if (!(c[i + 1] == null)) {
				d += this.chars[((c[i + 1] & 15) << 2) | (c[i + 2] >> 6)]
			} else {
				d += "="
			} if (!(c[i + 2] == null)) {
				d += this.chars[c[i + 2] & 63]
			} else {
				d += "="
			}
		}
		var e = d.slice(0, 64) + "\n";
		for (var i = 1; i < (Math.ceil(d.length / 64)); i++) {
			e += d.slice(i * 64, i * 64 + 64) + (Math.ceil(d.length / 64) == i + 1 ? "" : "\n")
		}
		return e
	},
	decode: function(a) {
		a = a.replace(/\s/g, "");
		var b = [];
		var c = [];
		var d = [];
		for (var i = 0; i < a.length; i = i + 4) {
			c[0] = this.chars.indexOf(a.charAt(i));
			c[1] = this.chars.indexOf(a.charAt(i + 1));
			c[2] = this.chars.indexOf(a.charAt(i + 2));
			c[3] = this.chars.indexOf(a.charAt(i + 3));
			d[0] = (c[0] << 2) | (c[1] >> 4);
			d[1] = ((c[1] & 15) << 4) | (c[2] >> 2);
			d[2] = ((c[2] & 3) << 6) | c[3];
			b.push(d[0], d[1], d[2])
		}
		b = b.slice(0, b.length - (b.length % 16));
		return b
	}
};
if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function(obj, start) {
		for (var i = (start || 0), j = this.length; i < j; i++) {
			if (this[i] === obj) {
				return i
			}
		}
		return -1
	}
}